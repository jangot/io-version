const api = axios.create({ baseURL: '/api'});

class EditRule {
    constructor($el) {
        this.$root = $el;
        this.$ruleSelect = $el.find('select');
        this.$val = $el.find('input[name="value"]');
        this.$send = $el.find('button[value="save"]');
        this.$remove = $el.find('button[value="remove"]');
        this.rule = $el.data('rule');
        this.env = $el.data('env');
        this.subscribe();
    }

    subscribe() {
        this.$val.add(this.$ruleSelect).on('keyup change', () => {
            const data = this.getData();
            const disabled = !data.ruleKeyId || !data.value;

            this.$send.prop('disabled', disabled);
        });

        this.$send.click(() => {
            const data = this.getData();

            api({
                method: this.rule ? 'PATCH' : 'POST',
                data,
                url: this.rule ? `/rule/${this.rule.id}` : '/rule'
            })
                .then(() => location.reload())
                .catch((err) => console.error(err));
        });

        this.$remove.click(() => {
            api
                .delete(`/rule/${this.rule.id}`)
                .then(() => location.reload())
                .catch((err) => console.error(err));
        });
    }

    getData() {
        return {
            ruleKeyId: Number(this.$ruleSelect.val()),
            value: this.$val.val(),
            environmentId: this.env.id
        }
    }
}

class EditEnv {
    constructor($el) {
        this.$el = $el;
        this.$name = $el.find('input[name="name"]');
        this.$description = $el.find('input[name="description"]');
        this.$orderIndex = $el.find('input[name="orderIndex"]');
        this.$btnUpdate = $el.find('.j-update');
        this.$btnRemove = $el.find('.j-remove');
        this.env = $el.data('env');

        this.subscribe();
    }

    subscribe() {
        this.$name.add(this.$description).keyup(() => {
            const data = this.getData();
            const disabled = !data.name || !data.description;
            this.$btnUpdate.prop('disabled', disabled);
        });
        this.$btnUpdate.click(() => {
            api({
                method: 'PATCH',
                url: `/environment/${this.env.id}`,
                data: this.getData(),
            })
                .then(() => location.reload())
                .catch((err) => console.error(err));
        });
        this.$btnRemove.click(() => {
            api({
                method: 'DELETE',
                url: `/environment/${this.env.id}`,
            })
                .then(() => location.reload())
                .catch((err) => console.error(err));
        });
    }

    getData() {
        return {
            name: this.$name.val(),
            description: this.$description.val(),
            orderIndex: +this.$orderIndex.val(),
        }
    }
}

class CreateEnv {
    constructor($el) {
        this.$el = $el;
        this.$name = $el.find('input[name="name"]');
        this.$description = $el.find('input[name="description"]');
        this.$orderIndex = $el.find('input[name="orderIndex"]');
        this.$btnAdd = $el.find('.j-add');

        this.subscribe();
    }

    subscribe() {
        this.$name.add(this.$description).keyup(() => {
            const data = this.getData();
            const disabled = !data.name || !data.description;
            this.$btnAdd.prop('disabled', disabled);
        });
        this.$btnAdd.click(() => {
            api({
                method: 'POST',
                url: '/environment',
                data: this.getData(),
            })
                .then(() => location.reload())
                .catch((err) => console.error(err));
        });
    }

    getData() {
        return {
            name: this.$name.val(),
            description: this.$description.val(),
            orderIndex: +this.$orderIndex.val(),
        }
    }
}

class KeyEdit {
    constructor($root) {
        this.$root = $root;
        this.$name = $root.find('[name="name"]');
        this.$specificity = $root.find('[name="specificity"]');
        this.$save = $root.find('[value="save"]');
        this.$remove = $root.find('[value="remove"]');
        this.key = $root.data('key');

        console.log(this);
        this.subscribe();
    }

    subscribe() {
        this.$name.add(this.$specificity).on('keyup change', () => {
            const data = this.getData();
            const disabled = !data.name || !data.specificity || data.specificity < 1;

            this.$save.prop('disabled', disabled);
        });

        this.$save.click(() => {
            const data = this.getData();

            api({
                method: this.key ? 'PATCH' : 'POST',
                data,
                url: this.key ? `/rule/key/${this.key.id}` : '/rule/key'
            })
                .then(() => location.reload())
                .catch((err) => console.error(err));
        });

        this.$remove.click(() => {
            api
                .delete(`/rule/key/${this.key.id}`)
                .then(() => location.reload())
                .catch((err) => console.error(err));
        });
    }

    getData() {
        return {
            name: this.$name.val(),
            specificity: Number(this.$specificity.val()),
        }
    }
}

$(() => {
    $('.j-rule-form').each((i, el) => new EditRule($(el)));
    $('.j-env-form').each((i, el) => new EditEnv($(el)));
    $('.j-keys').each((i, el) => new KeyEdit($(el)));
    $('.j-add-env').each((i, el) => new CreateEnv($(el)));
});