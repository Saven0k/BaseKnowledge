import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import PostDetail from '../components/PostDetail/PostDetail'
const PostPage = () => {
    const {id} = useParams()

    return (
        <>
        <Header />
        <PostDetail id={id}/>
        </>
    )
}

export default PostPage;