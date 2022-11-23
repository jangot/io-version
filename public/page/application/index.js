import { App } from '../../base/index.js';
import { AbstractController } from '../../base/abstract-controller.js';

class CreateVersion extends AbstractController {
    findElements() {
        this.input = this.find('.j-new-version input');
        this.button = this.find('.j-new-version button');
    }
    subscribe() {
        this.input.on('change keyup', () => {
            const val = this.input.val();
            this.button.prop('disabled', !val);
        });
        this.button.on('click', () => {
            this.app.api({
                method: 'POST',
                url: '/version',
                data: {
                    version: this.input.val(),
                    applicationId: this.entity.id
                },
                reloadAfter: true,
                defaultErrorHandler: {
                    message: 'Saiving version error.'
                }
            })
        });
    }
}

class RemoveDeploy extends AbstractController {
    findElements() {
        this.button = this.find('button');
    }
    subscribe() {
        this.button.click(() => {
            this.app.api({
                method: 'DELETE',
                url: `/deploy/${this.entity.id}`,
                reloadAfter: true,
                defaultErrorHandler: {
                    message: 'Removing error.'
                }
            });
        });
    }
}

class CreateDeploy extends AbstractController {
    findElements() {
        this.button = this.find('button.j-save-version');
        this.select = this.find('select.j-deploy-version');
    }

    subscribe() {
        this.button.click(() => {
            this.app.api({
                method: 'POST',
                url: '/deploy',
                data: this.getData(),
                reloadAfter: true,
                defaultErrorHandler: {
                    message: 'Deploy error.'
                }
            })
        });
        this.select.on('change', () => {
            const val = this.select.val();

            this.button.prop('disabled', !val);
        });
    }

    getData() {
        return {
            environmentId: this.entity.id,
            versoinId: +this.select.val(),
        }
    }
}


const app = new App('.applicaiont-page');
app.controller('.j-deploy', CreateDeploy);
app.controller('.j-remove-deploy', RemoveDeploy);
app.controller('.j-app', CreateVersion);
