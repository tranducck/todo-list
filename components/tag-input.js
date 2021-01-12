export default {
  name: 'tag-input',
  data () {
    return {
      tags: [],
    }
  },
  methods: {

  },
  render() {
    let $tags = this.tags.map(tag => (
      <div class="tag-input__tag">
        {tag}
        <span class="tag-input__tag-remove">&times;</span>
      </div>
    ))
    return (
      <div class="tag-input">
        {$tags}
      </div>
    )
  }
}
