import { updatePost } from "./workWithBd";


export default async function handleSavePostBtnPress(
    postID,
    newName,
    newText,
    newForField,
    func1,
    func2,
    func3,
    postsList,
    filteredPostsList,
    visible
) {
    const res = await updatePost(postID, newName, newText, newForField, visible);
    if (!res) return false;
    func1(null);
    func2(
        postsList.map((post) => {
            return post.id === postID
                ? { ...post, name: newName, text: newText, forField: newForField, visible: visible }
                : post;
        })
    );

    func3(
        filteredPostsList.map((post) => {
            return post.id === postID
                ? { ...post, name: newName, text: newText, forField: newForField, visible: visible }
                : post;
        })
    );
    // prepareData();
}