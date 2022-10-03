import React, { useState } from "react";
import Axios from 'axios'
import { Space, Card } from 'antd';
import { useNavigate } from "react-router-dom";

export const Upload = () => {
    let navigate = useNavigate();
    const [img, setImg] = useState(null)
    const [isUpload, setIsUpload] = useState(false)
    const [isPass, setIsPass] = useState(null)

    const handleImageChange = (e) => {
        setImg(e.target.files[0])
    };

    const onSubmit = () => {
        const formdata = new FormData();
        formdata.append('image', img)

        Axios.post('/upload', formdata)
            .then(function ({ status }) {
                if (status === 201) {
                    setIsUpload(true)

                    const reader = new FileReader();
                    reader.readAsDataURL(img);
                    reader.onload = (e) => {
                        const image = new Image();
                        image.src = e.target.result;
                        image.onload = (e) => {
                            const height = e.target.height;
                            const width = e.target.width;

                            if (width > 200 || height > 200) setIsPass(false)
                            else if (img.size > 51200) setIsPass(false)
                            else if (img.type !== 'image/jpg' && img.type !== 'image/jpeg') setIsPass(false)
                            else setIsPass(true)
                        };
                    };
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="auth-form-container">
            {isUpload ? 
                <>
                    <h1 style={{ marginBottom: '30px' }}>Result</h1>
                        {isPass ?
                            <Card >อัปโหลดสำเร็จ</Card> :
                            <Card style={{ borderColor: '#FF0000', color: '#FF0000', fontSize: '28px' }}>อัปโหลดล้มเหลว</Card>
                        }
                        <button style={{ width: '120px' }} onClick={() => navigate('/')}>Log Out</button>
                </> :
                <>
                    <h1 style={{ marginBottom: '30px' }}>Upload</h1><Space direction='vertical' size={40} align='center'>
                        <Card style={{ textAlign: 'left' }}>
                            <ul style={{ margin: 0 }}>
                                <li>ขนาดไฟล์ไม่เกิน 50 KB</li>
                                <li>สกุลไฟล์JPG ขนาดไม่เกิน 200x200 pixel</li>
                            </ul>
                        </Card>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange} />
                        <button style={{ width: '120px' }} onClick={onSubmit()}>upload</button>
                        
                    </Space>
                </>
            }

        </div>
    )
}

export default Upload;

