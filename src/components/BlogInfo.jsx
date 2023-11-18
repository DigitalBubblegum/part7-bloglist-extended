import blogService from '../services/blogs'
const BlogInfo = ({ blog, addedBy, id, useID, likesUpdater }) => {
  // console.log('mimimimimi', useID)
  // console.log('lulululu', id.id)
  const removeItem = async () => {
    let confirm = window.prompt(
      `are you sure you want to delete ${blog.title} by ${blog.author} type yes to confirm`,
    )
    if (confirm.toLocaleLowerCase() === 'yes') {
      console.log('deleted')
      await blogService.remove(blog.id)
      window.location.reload()
    } else if (confirm.toLocaleLowerCase() === 'no') {
      console.log('clicked no')
    } else {
      window.alert('invalid input try again')
    }
  }
  return (
    <div>
      <br />
      {blog.url}
      <br />
      {blog.likes}{' '}
      <button onClick={likesUpdater} className="likeButton">
        like
      </button>
      <br />
      {addedBy}
      <br />
      {useID === id.id ? (
        <button className="deletion" onClick={removeItem}>
          delete
        </button>
      ) : null}
    </div>
  )
}
export default BlogInfo
