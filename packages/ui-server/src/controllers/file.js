import fs from 'fs';

export default function async(context) {
    const path = context.query.path || '/';

    const files = fs.readdirSync(path);

    let items = (files || []).filter((f) => !f.startsWith('.')).map((f) => {
        const fpath = path + '/' + f;
        let type = 'file',
            size = 0,
            createdAt = null,
            updatedAt = null;
        try {
            const stat = fs.statSync(fpath);
            type = stat.isDirectory() ? 'dir' : type;
            size = stat.size;
            createdAt = stat.birthtimeMs;
            updatedAt = stat.mtimeMs;
        } catch (err) {
        }
        return {
            name: f,
            type,
            size,
            createdAt,
            updatedAt
        };
    });

    console.log(JSON.stringify(items));
    context.body = {
        code: 0,
        result: items
    };
}
