export class App {
    constructor(selector) {
        this.$root = $(selector);
        this.controllersList = [];

        this.api = axios.create({ baseURL: '/api'});
        this.api.interceptors.response.use(
            (response) => {
                if (response.config.reloadAfter) {
                    location.reload();
                }

                return response;
            },
            (error) => {
                console.log(error);
                if (error.config.defaultErrorHandler) {
                    let {
                        defaultErrorHandler,
                        message
                    } = error.config;

                    const finalMassage = defaultErrorHandler.message || message || 'Something went wrong!';

                    const alert = $('.j-error-alert');
                    alert.find('.j-error-message').html(finalMassage);
                    alert.show(100);
                    setTimeout(() => alert.hide(500), 5000);
                }

                return Promise.reject(error);
            });
    }

    controller(selector, Controller) {
        this.$root
            .find(selector)
            .each((i, el) => {
                const ctr = new Controller($(el), this);
                ctr.findElements();
                ctr.subscribe();

                this.controllersList.push(ctr);

                console.log(`${ctr.constructor.name} controller was created on`, el);
            });
    }
}