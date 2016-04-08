var DAO = (function () {
    const baseUrl = '/todoitems';

    return {
        findAll() {
            return new Promise((resolve, reject) => {
                request({
                        url: baseUrl,
                        method: 'GET',
                        json: true
                    },
                    (err, response, body) => err ? reject(err) : resolve(body)
                )
            })
        },

        save(props) {
            return new Promise((resolve, reject) => {
                request({
                        url: baseUrl,
                        method: 'POST',
                        json: true,
                        body: {description: props.description, importance: props.important}
                    },
                    (err, response, body) => err ? reject(err) : resolve(body)
                )
            })
        },

        remove(id) {
            return new Promise((resolve, reject) => {
                request({
                        url: baseUrl + '/' + id,
                        method: 'DELETE'
                    },
                    (err) => err ? reject(err) : resolve(true)
                );
            });
        },
        update(id, props) {
            // TODO fix the following hack
            if (props.hasOwnProperty('important')) {
                props.importance = props.important;
                delete props.important;
            }

            return new Promise((resolve, reject) => {
                request({
                        url: baseUrl + '/' + id,
                        method: 'PATCH',
                        json: true,
                        body: props
                    },
                    (err, response, body) => err ? reject(err) : resolve(body)
                );
            });
        }
    }
})();