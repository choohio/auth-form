export function configureFakeBackend() {

  let users = [
    {id: 1, name: 'User1', email: 'user1@mail.ru', password: 'user1pass'}, 
    {id: 2, name: 'User2', email: 'user2@mail.ru', password: 'user2pass'},
    {id: 3, name: 'User3', email: 'user3@mail.ru', password: 'user3pass'},
    {id: 4, name: 'User4', email: 'user4@mail.ru', password: 'user4pass'},
    {id: 5, name: 'User5', email: 'user5@mail.ru', password: 'user5pass'},
  ]

  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    const { method, headers } = opts;
    const body = opts.body && JSON.parse(opts.body);
      return new Promise((resolve, reject) => {
        setTimeout(handleRoute, 1000);
        function handleRoute() {
          if (url.endsWith('/users/authenticate') && method === 'POST') {
            return authenticate();
          } else {
            return realFetch(url, opts).then(response => resolve(response)).catch(error => reject(error));
          }
        }

        function authenticate() {
          console.log(body)
          const { email, password } = body;
          const user = users.find(x => x.email === email && x.password === password);
          if (!user) return error('Пользователь не найден.');
          console.log(user)
          return ok({
            id: user.id,
            name: user.name,
            email: user.email
          });
        }
      
        function ok(body) {
          resolve(JSON.stringify({ ok: true, status: 200, user: body }));
        }
        
        function error(message) {
          resolve(JSON.stringify({ status: 401, text: message }));
        }
      })
  }      
};
