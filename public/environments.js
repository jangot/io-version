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

$(() => {
    $('div[data-rule]').each((i, el) => new EditRule($(el)));
});