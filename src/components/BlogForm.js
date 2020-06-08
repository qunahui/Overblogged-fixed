import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { storage } from '../firebase/firebase'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';

class BlogForm extends Component {
    constructor(props) {
        super(props);
        let editorState = EditorState.createEmpty();
        if (props.blog) {
            const contentBlock = htmlToDraft(props.blog.content);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        }
        this.state = {
            isUpdating: !!props.isUpdating,
            description: props.blog ? props.blog.description : '',
            editorState,
            htmlMeta: props.blog ? props.blog.meta : [],
            htmlContent: props.blog ? props.blog.content : null,
            title: props.blog ? props.blog.title : '',
            thumbnail: props.blog ? props.blog.thumbnail : null,
        }
    }
    componentDidMount() {
        this.props.isUpdating ? console.log(this.state) : null
    }
    onEditorStateChange = (editorState) => {
        const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        this.setState({
            editorState,
            htmlContent: htmlContent
        })
    };

    uploadImg = async (file) => {
        let identify = file.name + '__' + Date.now();
        let imgURL;
        await storage.ref(`images/${identify}`).put(file);
        await storage.ref('images').child(identify).getDownloadURL().then(url => {
            imgURL = url;
        })
        return imgURL;
    }

    uploadCallback = async (file) => {
        let imgURL;
        await this.uploadImg(file).then(res => {
            imgURL = res;
        });
        return Promise.resolve({ data: { link: imgURL } });
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value })

    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value })
    }

    handleThumbNailChange = (e) => {
        e.preventDefault()
        this.setState({ thumbnail: e.target.files[0] })
        console.log(e.target.files[0])
    }

    onSubmit = async (e) => {
        e.preventDefault();
        let thumbnail;
        if (!this.props.isUpdating) {
            await this.uploadImg(this.state.thumbnail).then(res => {
                thumbnail = res;
            });
        }
        this.setMetaState();
        this.props.onSubmit({
            description: this.state.description,
            content: this.state.htmlContent,
            meta: this.state.htmlMeta,
            title: this.state.title,
            thumbnail: !this.props.isUpdating ? thumbnail : this.state.thumbnail
        })
    }
    add = (e) => {
        e.preventDefault();
        var new_no = parseInt($('#total_meta').val()) + 1;
        var new_meta = "<div id='meta_" + new_no + "'  class='input-group'>"
            + "<label>Name: </label> <input type='text' id='metaName_" + new_no + "' required/> "
            + "<label>Content: </label> <input type='text' id='metaContent_" + new_no + "'required/>"
            + "</div>";
        $('#meta-group').append(new_meta);

        $('#total_meta').val(new_no);
    }
    setMetaState = () => {
        let name_inputs = $("input[id^='metaName_']");
        let content_inputs = $("input[id^='metaContent_']");
        let htmlMeta = [...this.state.htmlMeta];
        for (let i = 0; i < name_inputs.length; i++) {
            let meta = { name: $(name_inputs[i]).val(), content: $(content_inputs[i]).val() };
            htmlMeta.push(meta);
        }
        this.setState({ htmlMeta });
        alert('saved');
    }

    remove = () => {
        var last_chq_no = $('#total_meta').val();

        if (last_chq_no > 1) {
            $('#meta_' + last_chq_no).remove();
            $('#total_meta').val(last_chq_no - 1);
        }
    }

    render() {
        const { editorState } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-group">
                    <label>Add title for your blog: </label>
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                    {this.state.title ? <p className="inlineMessage__success">Saved!</p> : null}
                </div>
                <div className="input-group">
                    <label>Add description for your blog: </label>
                    <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
                    {this.state.description ? <p className="inlineMessage__success">Saved!</p> : null}
                </div>
                <div className="input-group">
                    <label>Add your thumbnail for your blog: </label>
                    <input type="file" onChange={this.handleThumbNailChange} />
                    {this.state.thumbnail ? <p className="inlineMessage__success">Saved!</p> : null}
                </div>
                <div className="input-group" id="meta-group">
                    <label>Add meta data for your blog: </label>
                    <input type="hidden" value="1" id="total_meta"></input>
                    <button onClick={this.add} className="button button--darkpink button-small">Add</button>
                    <button onClick={this.remove} className="button button--darkpink button-small">Remove</button>
                </div>
                <Editor
                    placeholder="Create your blog here...."
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor editor-border"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: {
                            previewImage: true,
                            uploadEnabled: true,
                            uploadCallback: this.uploadCallback,
                        }
                    }}
                    toolbarStyle={{
                        color: 'black',
                        position: 'fixed',
                        left: '10vw',
                        top: '30vh',
                        width: '20%'
                    }}
                />
                <button className="button button-pinkwhite">Save blog</button>
            </form>
        );
    }
}

export default BlogForm;


// <input type="file" onChange={this.handleFileChange} />
//     <button onClick={this.addFile}>Upload</button>

// constructor(props) {
//     super(props);

//     this.state = {
//         htmlSections: '',
//         file: '',
//     }
// }

// onEditorStateChange = (value) => {
//     this.setState({ htmlSections: value })
//     console.log(this.state.htmlSections)
// }

// handleFileChange = e => {
//     e.preventDefault()
//     let file = e.target.files[0];
//     this.setState({ file })
// }

// addFile = (e) => {
//     e.preventDefault();
//     const { file } = this.state;
//     const uploadTask = storage.ref(`images/${file.name}`).put(file);
//     uploadTask.on('state_changed', snapshot => {

//     }, error => {
//         console.log(error);
//     }, () => {
//         storage.ref('images').child(file.name).getDownloadURL().then(url => {
//             let htmlSections = this.state.htmlSections + '<img src="' + url + '"/>'
//             this.setState({ htmlSections });
//         })
//     })
// }

// render() {
//     return (
//         <div>
//             <Editor
//                 editorState={this.state.htmlSections}
//                 toolbarClassName="toolbarClassName"
//                 wrapperClassName="wrapperClassName"
//                 editorClassName="editorClassName"
//                 onEditorStateChange={this.onEditorStateChange}
//             />
//         </div>
//     )
// }