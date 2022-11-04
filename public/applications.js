function getFetchOptions() {
    return {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }
}

function fetchPost(url, data) {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    });
}

$(() => {
    $('#createApp input').keyup((event) => {
        const val = $(event.target).val();
        $('#createApp button').prop('disabled', !val);
    });
    $('#createApp input').change((event) => {
        const val = $(event.target).val();
        $('#createApp button').prop('disabled', !val);
    });
    $('#createApp button').click(() => {
        $('#createApp error').hide();
        const name = $('#createApp input').val();
        if (!name) return;

        fetchPost('/api/application', {
            name,
            isActive: true
        })
        .then(() => {
            location.reload();
        })
        .catch(() => {
            $('#createApp error').show();
        })

        return false;
    });
});


$(() => {
    const nameInput = $('#createEnv input[name="name"]');
    const descriptionInput = $('#createEnv input[name="description"]');
    const indexInput = $('#createEnv input[name="index"]');
    const saveButton = $('#createEnv .j-save');
    const errorBlock = $('#createEnv .error');

    $(nameInput).add(descriptionInput).add(indexInput)
        .keyup(disableSend)
        .change(disableSend);

    saveButton.click(() => {
        errorBlock.hide();

        fetchPost('/api/environment', getData())
        .then(() => {
            // TODO check not success result
            // Looks like fetch doesn't go to catch
            location.reload();
        })
        .catch(() => {
            errorBlock.show();
        })

        return false;
    });

    function disableSend() {
        const data = getData();

        const disabled = !data.name || !data.description || data.orderIndex < 1;

        saveButton.prop('disabled', disabled);
    }

    function getData() {
        const name = nameInput.val();
        const description = descriptionInput.val();
        const orderIndex = indexInput.val();

        return {
            name,
            description,
            orderIndex: Number(orderIndex)
        }
    }
});

$(() => {
    const input = {
        appName: $('#deployAppName'),
        appId: $('#deployAppId'),
        envName: $('#deployEnvName'),
        envId: $('#deployEnvId'),
        version: $('#deployVersion')
    };
    const button = {
        submit: $('#deploy button'),
        app: $('#applications-list button'),
        env: $('#environments-list button')
    };

    button.app.click(function (){
        const app = $(this).data('app');
        input.appId.val(app.id);
        input.appName.val(app.name);

        button.submit.prop('disabled', isDisabledSubmit());
    });

    button.env.click(function (){
        const env = $(this).data('env');
        input.envId.val(env.id);
        input.envName.val(env.name);

        button.submit.prop('disabled', isDisabledSubmit());
    });

    function isDisabledSubmit() {
        const data = getData();

        return !data.applicationId || !data.environmentId;
    }

    function getData() {
        return {
            applicationId: +input.appId.val(),
            environmentId: +input.envId.val(),
            version: input.version.val(),
        }
    }

    button.submit.click(() => {
        fetchPost('/api/version', getData())
        .then(() => {
            // TODO check not success result
            // Looks like fetch doesn't go to catch
            location.reload( );
        });

        return false;
    });
});
