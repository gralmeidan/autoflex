# Teste Prático - Autoflex

## Rodando o código.

Clone o repositório e entre na pasta com:

```bash
$ git clone https://github.com/gralmeidan/autoflex.git
$ cd autoflex
```

Suba os contâineres da aplicação com:

```bash
$ docker-compose up
```

E pronto! Por padrão o Front-End é hospedado em `localhost:3000` e a API em `localhost:3001`.

As pastas `src` de ambos os projetos irão atualizar nos contâineres assim que modificadas, porém quando ocorrer alguma modificação nas raízes dos projetos é preciso subir os contâineres novamente.

## Rodando os testes.

Conecte-se ao contâiner do Back-End com:

```bash
$ docker exec -it app_backend sh
```

E rode o comando:

```bash
$ npm test
```

Para ter a porcentagem de cobertura de testes rode:

```bash
$ npm run test-coverage
```
