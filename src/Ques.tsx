import { useState } from 'react';
import { Form, InputNumber, Button, Select, Modal, Divider } from 'antd';
import { Variables, computeP } from './computation';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: {
		xs: { offset: 0 },
		sm: { offset: 8 }
	},
};

const Rules = [{ required: true, message: '必填项' }];

function showResult(values: Variables) {
	const result = computeP(values);
	const formatted = (result * 100).toFixed(1) + '%';
  Modal.info({
    title: '糖尿病嗅觉认知风险评分表',
    content: (<div>
			<p></p>
			<p>性别：{+values.sex ? '女' : '男'}</p>
			<p>出生年份：{values.birthYear}</p>
			<p>受教育年限：{values.education}</p>
			<p>任务B得分：{values.taskB}</p>
			<p>是否吸烟：{+values.smoke ? '是' : '否'}</p>
			<Divider />
			<p>轻度认知功能障碍概率为：{formatted}</p>
		</div>),
    okText: '确认',
  });
}

export const Ques = () => {
	const [isComputing, setIsComputing] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: Variables) => {
		setIsComputing(true);
		setTimeout(() => {
			setIsComputing(false);
			showResult(values);
		}, 800);
  };	

  // const onReset = () => {
  //   form.resetFields();
  // };

  return (
    <Form {...layout}
			form={form}
			name="ques"
			requiredMark={false}
			onFinish={onFinish}
		>
      <Form.Item name="sex" label="性别" rules={Rules}>
				<Select>
          <Option value="0">男</Option>
          <Option value="1">女</Option>
        </Select>
      </Form.Item>
			<Form.Item name="birthYear" label="出生年份" rules={Rules}>
				<InputNumber min={1900} max={(new Date()).getFullYear()} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name="education" label="受教育年限" rules={Rules}>
				<InputNumber min={1} max={100} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name="taskB" label="任务B得分" rules={Rules}>
				<InputNumber min={0} max={20} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name="smoke" label="是否吸烟" rules={Rules}>
				<Select>
          <Option value="0">否</Option>
          <Option value="1">是</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
					type="primary"
					htmlType="submit"
					loading={isComputing}
					disabled={isComputing}
				>
          提交
        </Button>
        {/* <Button htmlType="button" onClick={onReset} style={{ marginLeft: '0.5rem' }}>
          重置
        </Button> */}
      </Form.Item>
    </Form>
  );
};
