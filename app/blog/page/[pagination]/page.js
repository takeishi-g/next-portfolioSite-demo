import Link from "next/link";
import Image from "next/image";
import Pagination from "../../../components/pagination";
import { getAllBlogs, blogsPerPage, getSingleBlog } from "../../../utils/mdQueries";


const Blog = async (props) => {
  const { blogs, numberPages } = await getAllBlogs();
  const currentPage = props.params.pagination
  const limitedBlogs = blogs.slice((currentPage -1) * blogsPerPage, currentPage * blogsPerPage)
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1>Blog</h1>
          <p>エンジニアの日常生活をお届けします</p>
          {limitedBlogs.map((blog, index) => (
            <div key={index} className="blogCard">
              <div className="cardContainer">
                <h2>{blog.frontmatter.title}</h2>
                <p>{blog.frontmatter.date}</p>
                <Link href={`/blog/${blog.slug}`} className="linkButton">Read More</Link>
              </div>
              <div className="blogImg">
                <Image
                  src={blog.frontmatter.image}
                  alt="card-image"
                  height={300}
                  width={1000}
                  quality={90}
                  priority={true}
                />
              </div>
            </div>
          ))}
        </div>
        <Pagination numberPages={numberPages} />
      </div>
    </>
  );
};

export default Blog;


export async function generateStaticParams() {
  const { numberPerPages } = await getAllBlogs()

  let paths = []
  Array.from({length: numberPerPages}).map((_,index) => paths.push(`/blog/page/${index + 2}`))

  return paths
}