---
title: Copy to SMB
draft: true
tags: [code, macos]
---

## Code

```bash
#!/usr/bin/env bash
set -euo pipefail

############################################
# CONFIGURE THESE
############################################
SMB_SERVER="server.local"     # e.g., fileserver.company.local or IP
SMB_SHARE="Projects"                      # the share name, e.g., 'Projects'
SMB_USER="your-username"                  # your SMB username (no password here)
LOCAL_SOURCE="/Users/derek/Documents/ArchitecturalDrawings"   # folder to move FROM
DEST_NEW_FOLDER_NAME="2026-01-03-Upload"  # folder to create ON the SMB share

# If you already mount the share (e.g., via Finder), set this to that path.
# Otherwise the script will mount it to /Volumes/<SMB_SHARE>.
MOUNT_POINT="/Volumes/${SMB_SHARE}"

# Deletion behavior & verification
AUTO_DELETE="true"     # Set to "true" to delete sources after a verified copy
USE_CHECKSUM="false"   # Set to "true" to verify by checksums (slower, but thorough)

# Optional: log to a file (uncomment to enable)
# LOGFILE="$HOME/rsync_smb_$(date +%F_%H%M%S).log"

# Optional: unmount the SMB share when done
UNMOUNT_AFTER="false"  # Set to "true" to unmount at end

############################################
# ADVANCED (optional filters)
############################################
# Example: only move PDFs and DWGs
# INCLUDE_EXCLUDE=(--include='*.pdf' --include='*.dwg' --exclude='*')
INCLUDE_EXCLUDE=()    # leave empty to move everything

############################################
# UTILS
############################################
error() { echo "❌ $*" >&2; exit 1; }
info()  { echo "🔹 $*"; }
ok()    { echo "✅ $*"; }

rsync_base_flags=(-a -v -h --progress --inplace --no-compress)
if [[ "$USE_CHECKSUM" == "true" ]]; then
  rsync_base_flags+=(--checksum)
fi

############################################
# PRECHECKS
############################################
[ -d "$LOCAL_SOURCE" ] || error "Local source folder not found: $LOCAL_SOURCE"
command -v rsync >/dev/null 2>&1 || error "rsync not found. It should be present on macOS."
command -v mount_smbfs >/dev/null 2>&1 || info "mount_smbfs not found? On macOS it is /sbin/mount_smbfs."

############################################
# MOUNT SMB SHARE IF NEEDED
############################################
# If the mount point directory doesn't exist, create it with sudo (Volumes is root-owned)
if [ ! -d "$MOUNT_POINT" ]; then
  info "Creating mount point: $MOUNT_POINT"
  sudo mkdir -p "$MOUNT_POINT"
fi

# Check if it's already mounted
if mount | grep -q "on ${MOUNT_POINT} .*smbfs"; then
  info "SMB share already mounted at $MOUNT_POINT"
else
  info "Mounting SMB share //${SMB_SERVER}/${SMB_SHARE} to $MOUNT_POINT"
  read -r -s -p "Enter SMB password for ${SMB_USER}: " SMB_PASS
  echo

  # Build SMB URL. If your password has special characters, consider mounting via Finder/Keychain
  SMB_URL="//${SMB_USER}:${SMB_PASS}@${SMB_SERVER}/${SMB_SHARE}"

  # Attempt mount (may require Terminal Full Disk Access on macOS)
  /sbin/mount_smbfs "$SMB_URL" "$MOUNT_POINT" || error "Failed to mount SMB share. Verify credentials and share permissions."
fi

############################################
# CREATE DESTINATION FOLDER ON SMB
############################################
DEST_PATH="${MOUNT_POINT}/${DEST_NEW_FOLDER_NAME}"
if [ -d "$DEST_PATH" ]; then
  info "Destination folder already exists: $DEST_PATH"
else
  info "Creating destination folder: $DEST_PATH"
  mkdir -p "$DEST_PATH" || error "Cannot create destination folder at $DEST_PATH"
fi

############################################
# PHASE 1: COPY WITHOUT DELETING
############################################
info "Phase 1: Copying from '$LOCAL_SOURCE' to '$DEST_PATH' (no deletion yet)..."

# Optional logging
if [ -n "${LOGFILE-}" ]; then
  { rsync "${rsync_base_flags[@]}" "${INCLUDE_EXCLUDE[@]}" \
      "$LOCAL_SOURCE"/ "$DEST_PATH"/; } | tee -a "$LOGFILE"
else
  rsync "${rsync_base_flags[@]}" "${INCLUDE_EXCLUDE[@]}" \
      "$LOCAL_SOURCE"/ "$DEST_PATH"/
fi

############################################
# PHASE 2: VERIFY DESTINATION HAS ALL FILES
############################################
info "Phase 2: Verifying destination completeness..."
VERIFY_OUTPUT=$(rsync -n "${rsync_base_flags[@]}" "${INCLUDE_EXCLUDE[@]}" \
  "$LOCAL_SOURCE"/ "$DEST_PATH"/ || true)

# If dry-run shows transfers needed (non-empty listing), abort deletion
# Heuristic: rsync dry-run prints file entries when there is work to do.
if echo "$VERIFY_OUTPUT" | grep -qE '^[^ ]|^sending incremental file list'; then
  # There might still be work left; double-check by looking for file lines
  if echo "$VERIFY_OUTPUT" | grep -qE '^\S'; then
    error "Verification detected files still needing transfer. Aborting deletion. Re-run the script or investigate."
  fi
fi

ok "Verification passed—no further transfers needed."

############################################
# PHASE 3: DELETE SOURCE FILES (SAFE)
############################################
if [[ "$AUTO_DELETE" == "true" ]]; then
  info "Phase 3: Removing source files that exist at the destination..."
  # Use rsync's --remove-source-files to delete only files confirmed copied
  if [ -n "${LOGFILE-}" ]; then
    { rsync "${rsync_base_flags[@]}" "${INCLUDE_EXCLUDE[@]}" \
        --remove-source-files \
        "$LOCAL_SOURCE"/ "$DEST_PATH"/; } | tee -a "$LOGFILE"
  else
    rsync "${rsync_base_flags[@]}" "${INCLUDE_EXCLUDE[@]}" \
      --remove-source-files \
      "$LOCAL_SOURCE"/ "$DEST_PATH"/
  fi

  # Remove empty directories left in source
  info "Cleaning up empty directories in source..."
  find "$LOCAL_SOURCE" -type d -empty -delete || info "Some directories not empty; skipping removal."

  ok "Source files removed and directories tidied."
else
  info "AUTO_DELETE=false → Skipping source deletion."
fi

############################################
# OPTIONAL: UNMOUNT SMB SHARE
############################################
if [[ "$UNMOUNT_AFTER" == "true" ]]; then
  info "Unmounting $MOUNT_POINT..."
  # diskutil is friendlier for network volumes than umount on macOS
  diskutil unmount "$MOUNT_POINT" || info "Could not unmount; it may be in use."
fi

ok "All done. 📁 Destination: $DEST_PATH"

```

chmod +x ~/Desktop/copy_to_smb_and_delete.sh

~/Desktop/copy_to_smb_and_delete.sh

