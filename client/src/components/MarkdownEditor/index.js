import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MarkdownEditor = ({ label, value, onChangeValue, invalidField, setInvalidField }) => {
    return (
        <div className="my-[20px]">
            {label && <label className="text-[16px] opacity-60 ml-[14px]">{label}</label>}
            <Editor
                apiKey={process.env.REACT_APP_KEY_MCE}
                initialValue={value}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onChange={(e) => onChangeValue(e.target.getContent())}
                onFocus={() => setInvalidField((prev) => ({ ...prev, description: false }))}
            />
            {invalidField.description && (
                <p className="ml-1 mt-[2px] text-[14px] text-red-600">Vui lòng nhập trường này!</p>
            )}
        </div>
    );
};

export default memo(MarkdownEditor);
