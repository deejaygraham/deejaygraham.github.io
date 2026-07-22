import path from 'path';
import { normalizeTags } from "../../_11ty/utils/tag-taxonomy.js";

const convertFileNameToPath = (filename) => {
    const [year, month, day, ...rest] = filename.split('-');
    const slug = rest.join('-').replace('.md', '/');
    return path.join(year, month, day, slug);
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
        tags: (data) => {
            return normalizeTags(data.tags);
        }
    }
};
