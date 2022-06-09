module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: "cheeses_api",
      user: "root",
      password: "*)N5%zSBF&kE",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "cheeses_api",
      user: "root",
      password: "*)N5%zSBF&kE",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "cheeses_api",
      user: "root",
      password: "*)N5%zSBF&kE",
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};