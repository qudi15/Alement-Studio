export default {
  created () {
    this.mixMethod('validate', () => {
      return this.validate()
    })
  },

  methods: {
    /**
     *
     */
    validate () {
      return Promise.reject(new Error('validate method is not implemented'))
    }
  }
}
