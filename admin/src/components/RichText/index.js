import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { message } from 'antd';
// import htmlToDraft from 'html-to-draftjs';
import '@/../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './richText.scss'
const allowType = ['jpg', 'jpeg', 'png', 'gif']
class RichText extends Component {
  state = {
      editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState) => {
      this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      this.setState({
          editorState
      });
  };

  uploadImageCallBack = (img) => {
      console.log(img)
      return new Promise((resolve, reject) => {
          const type = img.name.split('.')[img.name.split('.').length - 1]
          if(allowType.find(item => {var reg = new RegExp(item, 'i'); return reg.test(type)}) && img.size < 512000) {
          // 仅可上传allowType中允许的格式并且图片不可超过500KB
              resolve({ data: { link: 'https://www.baidu.com/'}})
          } else {
              message.error(`仅可上传${allowType.toString()}格式的图片，并且小于500KB`);
              reject(false)
          }
      })
  }

  render() {
      const { editorState } = this.state;
      return (
          <div>
              <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  localization={{
                      locale: 'zh'
                  }}
                  toolbar={{image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } }}}
              />
              {/* <textarea
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
              /> */}
          </div>
      );
  }
}

export default RichText