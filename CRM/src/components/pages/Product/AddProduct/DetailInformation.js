import React, {useEffect, useState} from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Select,
    Col,
    Row
} from "antd";
import ImageUploader from "./ImageUploader";
const DetailInformation = ({ layout, tailLayout, next, prev, detailFormData }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ ...detailFormData })
    }, [detailFormData])

    const onFinish = (values) => {
        next()
    };
    const onSubmit = () => {
        console.log(form.getFieldsValue());
        form.submit()
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    
    return (
        <>
            <Form
                {...layout}
                name="detail"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            
                            required: true,
                            message: "Please input your product description!",
                        },
                    ]}
                >
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: {
                                items: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                            },
                            placeholder:"Product full descrption here..",
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            form.setFieldsValue({
                                description: data,
                            })
                        }}
                        onReady={( editor) => {
                            editor.setData(form.getFieldValue('description'))
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Highlights"
                    name="highlights"
                    rules={[
                        {
                            required: true,
                            message: "Please input highlights of the product!",
                        },
                    ]}
                >
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: {
                                items: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                            },
                            placeholder:'Product Highlights here..'
                            }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            form.setFieldsValue({
                                highlights: data,
                            })
                        }}
                        onReady={(editor) => {
                            editor.setData(form.getFieldValue('highlights'))
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Video ID"
                    name="videoURL"
                    rules={[
                        {
                            type: 'string',
                        }
                    ]}
                >
                    <Input style={{ width: '100%' }} placeholder="KaAkyTd165Y" />
                </Form.Item>
                <Row justify="center" gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Color"
                                name="color"
                                rules={[
                                    {
                                        type: 'array',
                                    }
                                ]}
                            >
                                <Select open={false} mode="tags" style={{ width: '100%' }} placeholder="Black, Red" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={10}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Warranty"
                                name="warranty"
                                rules={[
                                    {
                                        type: 'string',
                                        required: true,
                                        message: 'Please input product warranty!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Weight"
                                name="weight"
                                rules={[
                                    {
                                        type: 'array',
                                    }
                                ]}
                            >
                                <Select open={false} mode="tags" style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row justify="center" gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Return"
                                name="return"
                                rules={[
                                    {
                                        type: 'string',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={{ padding: '8px 0' }}>
                            <Form.Item
                                label="Size"
                                name="size"
                                rules={[
                                    {
                                        type: 'array',
                                    }
                                ]}
                            >
                                <Select open={false} mode="tags" style={{ width: '100%' }}/>
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Form.Item
                    label="Images"
                    name="images"
                    rules={[
                        {
                            type: 'array',
                            required: true,
                            message: 'Please add product images!',
                        }
                    ]}
                >
                    <ImageUploader form={form} />
                </Form.Item>
                {/* <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
            </Form>
            <div className="steps-action">
                <Button type="primary" onClick={onSubmit}>
                    Next
                </Button>
                <Button style={{ margin: "0 8px" }} onClick={()=>prev(form.getFieldsValue())}>
                    Previous
            </Button>
            </div>
        </>

    );
};

DetailInformation.propTypes = {
    // uploadedImages: PropTypes.array,
    detailFormData: PropTypes.object,
};

const mapStateToProps = (state) => ({
    // uploadedImages: state.product.uploadedImages
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(DetailInformation));