export default {
  created () {
    this.mixMethod('submit', () => {
      return this.submit()
    })
  },

  methods: {
    /**
     * abstract method
     */
    submit () {
      return Promise.reject(new Error('submit method is not implemented'))
    }
  }
}
