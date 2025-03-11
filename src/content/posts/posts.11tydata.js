import fs from 'fs';
import path from 'path';

const converFileNameToPath = (filename) => {
    const [year, month, day, ...rest] = filename.split('-');
    const slug = rest.join('-').replace('.md', '/');
    return path.join(year, month, day, slug);
};

export default {
    eleventyComputed: {
        permalink: (data) => {
            console.log(name);
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
            //    return `/img/posts/${data.thumbnail}`;
            }
            return false;
        }
    }
};