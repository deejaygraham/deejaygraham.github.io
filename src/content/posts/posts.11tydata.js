import path from 'path';

const convertFileNameToPath = (filename) => {
    const [year, month, day, ...rest] = filename.split('-');
    const slug = rest.join('-').replace('.md', '/');
    return path.join(year, month, day, slug);
};

const tagAliases = new Map([
    ['mac-os', 'macos'],
]);

const normalizeTag = (tag) => {
    if (typeof tag !== 'string') {
        return '';
    }

    const normalized = tag.trim().toLowerCase();
    return tagAliases.get(normalized) || normalized;
};

const normalizeTags = (tags) => {
    const values = Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
            ? [tags]
            : [];

    const seen = new Set();
    const normalizedTags = [];
    for (const tag of values) {
        const normalized = normalizeTag(tag);
        if (!normalized || seen.has(normalized)) {
            continue;
        }

        seen.add(normalized);
        normalizedTags.push(normalized);
    }

    return normalizedTags;
};

export default {
    eleventyComputed: {
        permalink: (data) => {
            const name = convertFileNameToPath(path.basename(data.page.inputPath));
            //console.log(name);
            return name;
        },
        layout: (data) => {
            if (data.layout) {
                return data.layout;
            }
            return 'post';
        },
        thumbnail: (data) => {
            if (data.thumbnail) {
                return data.thumbnail;
            //    return `/img/posts/${data.thumbnail}`;
            }
            return `/img/posts/${data.page.fileSlug}/thumbnail-420x255.jpg`;
        },
        tags: (data) => {
            return normalizeTags(data.tags);
        }
    }
};
