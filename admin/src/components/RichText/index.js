import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { message } from 'antd';
import { uploadImg } from '@/http/notice';
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

  uploadImageCallBack = async (img) => {
      //   console.log(img)
      const type = img.name.split('.')[img.name.split('.').length - 1]
      if(allowType.find(item => {var reg = new RegExp(item, 'i'); return reg.test(type)}) && img.size < 512000) {
          // 仅可上传allowType中允许的格式并且图片不可超过500KB
          const url = (await uploadImg(img)).data.url
          console.log(url)
          return { data: { link: url} }
      } else {
          message.error(`仅可上传${allowType.toString()}格式的图片，并且小于500KB`);
          return false
      }
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
                  toolbar={{image: { uploadCallback: this.uploadImageCallBack }}}
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