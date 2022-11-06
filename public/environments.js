const api = axios.create({ baseURL: '/api'});

class EditRule {
    constructor($el) {
        this.$root = $el;
        this.$ruleSelect = $el.find('select');
        this.$val = $el.find('input[name="value"]');
        this.$send = $el.find('input[type="button"]');
        this.rule = $el.data('rule');
        this.env = $el.data('env');

        this.subscribe();
    }

    subscribe() {
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
        this.$send = $el.find('button');
        this.env = $el.data('env');

        console.log(this);
        this.subscribe();
    }

    subscribe() {
        this.$name.add(this.$description).keyup(() => {
            const data = this.getData();
            const disabled = !data.name || !data.description;
            this.$send.prop('disabled', disabled);
        });
        this.$send.click(() => {
            api({
                method: 'PATCH',
                url: `/environment/${this.env.id}`,
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

$(() => {
    $('.j-rule-form').each((i, el) => new EditRule($(el)));
    $('.j-env-form').each((i, el) => new EditEnv($(el)));
});