export class AbstractController {
    constructor(root, app) {
        this.root = root;
        this.app = app;
        this.entity = root.data('entity');
    }

    find(selector) {
        return this.root.find(selector);
    }

    getData() {
        const res = {};

        this.root.find('input').each((i, el) => {
            const name = $(el).attr('name');
            const value = $(el).val();

            try {
                res[name] = JSON.parse(value);
            } catch {
                res[name] = value;
            }
        });

        return res;
    }
}