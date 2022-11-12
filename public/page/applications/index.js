import { App } from '../../base/index.js';
import { AbstractController } from '../../base/abstract-controller.js';

class UpdateApp extends AbstractController {
    findElements() {
        this.name = this.find('.j-save-app input[name="name"]');
        this.save = this.find('.j-save-app button[value="save"]');
        this.remove = this.find('.j-save-app button[value="remove"]');
    }
    subscribe() {
        this.save.click(() => {
            const data = this.getData('.j-update-app');
            this.app.api({
                method: this.entity ? 'PATCH' : 'POST',
                url: this.entity ? `/application/${this.entity.id}` : '/application',
                data,
                reloadAfter: true
            })
        });
        this.remove.on('click', () => {
            this.app.api({
                method: 'DELETE',
                url: `/application/${this.entity.id}`,
                reloadAfter: true
            })
        });
        this.name.on('change keyup', () => {
            const data = this.getData('.j-update-app');
            this.save.prop('disabled', !data.name);
        });
    }
}

class CreateVersion extends AbstractController {
    findElements() {
        this.input = this.find('.j-new-version input[name="version"]');
        this.button = this.find('.j-new-version button[value="save"]');
        this.select = this.find('select[name="version"]');
    }

    subscribe() {
        this.input.on('change keyup', () => {
            const data = this.getData('.j-new-version');
            this.button.prop('disabled', !data.version);
        });
        this.button.on('click', () => {
            const data = this.getData('.j-new-version');

            this.app.api({
                method: 'POST',
                url: '/version',
                data: {
                    ...data,
                    applicationId: this.entity.id
                },
                defaultErrorHandler: {
                    message: 'Saiving version error.'
                }
            })
            .then(({ data }) => {
                this.select
                    .find('option')
                    .first()
                    .after(`<option value="${data.id}">${data.version}</option>`);
                this.select.val(data.id);
            })
        });
    }
}

class Deploy extends AbstractController {
    findElements() {
        this.select = this.find('select[name="version"]');
        this.radio = this.find('input[type="radio"]');
        this.deploy = this.find('button[value="deploy"]')
    }

    subscribe() {
        this.select.add(this.radio).on('click change', () => {
            const data = this.getData();
            console.log(data);
            const disabled = !data.environmentId || !data.versoinId;

            this.deploy.prop('disabled', disabled);
        });
        this.deploy.on('click', () => {
            const data = this.getData();

            this.app.api({
                method: 'POST',
                url: '/deploy',
                data,
                defaultErrorHandler: {
                    message: 'Saiving version error.'
                }
            }).then(() => {
                this.app.showSuccessAlert(
                    `${data.versoinId}
                    version of "${this.entity.name}"
                    was deploed to ${data.environmentId}`
                )
            });
        });
    }

    getData() {
        const env = this.radio.filter(':checked').val();
        const ver = this.select.val();

        return {
            environmentId: Number(env),
            versoinId: Number(ver),
        }
    }
}

const app = new App('.applicaiont-page');
app.controller('.j-application', UpdateApp);
app.controller('.j-application', CreateVersion);
app.controller('.j-application', Deploy);