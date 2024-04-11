@{

# Script module or binary module file associated with this manifest.
RootModule = 'cApplicationConfiguration.psm1'

# Version number of this module.
ModuleVersion = '0.1'

# ID used to identify this module uniquely
GUID = '59E3596B-8447-4FC8-84AE-0F35F93881F1'

# Description of the functionality provided by this module
Description = 'DSC resource provider to modify application configuration settings'

# Minimum version of the Windows PowerShell engine required by this module
PowerShellVersion = '5.0'

# Name of the Windows PowerShell host required by this module
# PowerShellHostName = ''

# Required for DSC to detect PS class-based resources.
DscResourcesToExport =  @('cApplicationConfiguration') 

}  