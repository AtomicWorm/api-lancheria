
# API REST para uma lancheria

API desenvolvida para retornar informações de cardápio e endereço para um bot que efetua pedidos de entrega de lanches.

## Documentação da API

#### Retorna todos os itens do menu

```http
  GET /
```

#### Retorna um item específico do menu

```http
  GET /:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | O ID do item que você quer |

#### Retorna informações sobre um CEP especificado

```http
  GET /cep/:cep
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O CEP do qual você quer informações. |

#### Adiciona um item ao menu

```http
  POST /
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | O ID do novo item a ser adicionado. |
| `nome`      | `string` | O nome do novo item a ser adicionado. |
| `valor`      | `number` | O valor do novo item a ser adicionado. |

#### Edita um item do menu

```http
  PUT /:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | O ID do item a ser editado. |
| `nome`      | `string` | O novo nome do item a ser editado. |
| `valor`      | `number` | O novo valor do item a ser editado. |

#### Remove um item do menu

```http
  DELETE /:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | O ID do item a ser removido. |

## Stack utilizada

**Front-end:** BLiP

**Back-end:** Node, Express, Axios


## Aprendizado

* Uso dos métodos HTTP em uma API
* Troca de informações entre um chatbot BLiP e API
* Hospedagem de API na nuvem via Heroku

## Autores

- [Yuri Carvalho da Silva](https://github.com/AtomicWorm)
