import { App } from '../../base/index.js';
import { AbstractController } from '../../base/abstract-controller.js';

class UpdateApp extends AbstractController {
    findElements() {
        this.name = this.find('input[name="name"]');
        this.save = this.find('button[value="save"]');
        this.remove = this.find('button[value="remove"]');
    }
    subscribe() {
        this.save.click(() => {
            const data = this.getData();
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
            const data = this.getData();
            this.save.prop('disabled', !data.name);
        });
    }
}

const app = new App('.applicaiont-page');
app.controller('.save-app', UpdateApp);