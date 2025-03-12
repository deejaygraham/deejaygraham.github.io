import path from 'path';

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
        thumbnail: (data) => {
            if (data.thumbnail) {
                return data.thumbnail;
            //    return `/img/posts/${data.thumbnail}`;
            }
            return `/img/posts/${data.page.fileSlug}/thumbnail-420x255.jpg`;
        }
    }
};
