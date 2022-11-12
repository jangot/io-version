export class App {
    constructor(selector) {
        this.$root = $(selector);
        this.controllersList = [];

        this.findElements();
        this.buildApi();
    }

    controller(selector, Controller) {
        this.$root
            .find(selector)
            .each((i, el) => {
                const ctr = new Controller($(el), this);
                ctr.findElements();
                ctr.subscribe();

                this.controllersList.push(ctr);

                // console.log(`${ctr.constructor.name} controller was created on`, el);
            });
    }

    findElements() {
        this.dangerAlert = this.$root.find('.j-danger-alert');
        this.successAlert = this.$root.find('.j-success-alert');
    }

    buildApi() {
        this.api = axios.create({ baseURL: '/api'});
        this.api.interceptors.response.use(
            (response) => {
                if (response.config.reloadAfter) {
                    location.reload();
                }

                return response;
            },
            (error) => {
                if (error.config.defaultErrorHandler) {
                    let {
                        defaultErrorHandler,
                        message
                    } = error.config;

                    const finalMassage = defaultErrorHandler.message || message || 'Something went wrong!';

                    this.showDangerAlert(finalMassage);
                }

                return Promise.reject(error);
            });

    }

    showDangerAlert(message) {
        const alert = this.dangerAlert;

        alert.find('.j-alert-message').html(message);
        alert.show(100);
        setTimeout(() => alert.hide(500), 5000);
    }
    showSuccessAlert(message) {
        const alert = this.successAlert;

        alert.find('.j-alert-message').html(message);
        alert.show(100);
        setTimeout(() => alert.hide(500), 5000);
    }
}