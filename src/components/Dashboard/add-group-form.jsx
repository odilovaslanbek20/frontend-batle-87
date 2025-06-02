import { Button, Form, Input, Space } from 'antd';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const AddGroup = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default AddGroup;