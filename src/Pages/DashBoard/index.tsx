/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { InputGroup, Form, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { ConfirmModal } from "Component/Modal/ConfirmModal";
import TaskModal from "Component/Modal/TaskModal";
import PaginationBasic from "Component/Pagination";
import { metadata, task } from "Type/Type";
import axiosClient from "api/axiosClient";

import DefaultLayout from "../../Component/DefaultLayout";
import { tasksSelector, user } from "../../redux/selector";
import { addTask, completeTask, deleteTask, unCompleteTask, updateTask, updateTasks } from "./taskSlice";
import './style.scss';
// eslint-disable-next-line import/order
import { changeDateFormat } from "../../utils/DateFormat";

export default function DashBoard() {
    const userSelector = useSelector(user);
    const dispatch = useDispatch();
    const tasks = useSelector(tasksSelector);
    const [searchString, setSeachString] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [show, setShow] = React.useState('');
    const [actionRow, setActionRow] = React.useState(0);
    const [modalContent, setModalContent] = React.useState('');
    const [metadata, setMetadata] = React.useState<metadata>({} as metadata);
    const [task, setTask] = React.useState<task>({} as task);
    const [categories, setCategories] = React.useState<string[]>([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`task/all-tasks/${userSelector.id}`, {
                    params: {
                        searchString: searchString,
                        page: page,
                        pageSize: pageSize
                    }
                });
                setMetadata({
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                    elements: response.data.elements,
                });
                dispatch(updateTasks(response.data.data));
                const categoriesResponse = await axiosClient.get(`task/categories/${userSelector.id}`);
                setCategories(categoriesResponse.data);
            } catch (err) {
                console.error(err);

            }
        };
        fetchData();
    }, [page,pageSize,searchString]);
    const handleChangeTaskInfo = (title: string, value: unknown) => {
        setTask(() => {
            return {
                ...task,
                [title]: value
            };
        });
    };
    const handleCloseModal = () => {
        setShow('');
        setActionRow(0);
        setModalContent('');
        setTask({} as task);
    };
    const handleDonetask = async () => {
        try {
            await axiosClient.put(`task/complete-task/${actionRow}`);
            dispatch(completeTask(actionRow));

        } catch (err) {
            console.error(err);
        }
    };
    const handleUnCompletedTask = async () => {
        try {
            await axiosClient.put(`task/discomplete-task/${actionRow}`);
            dispatch(unCompleteTask(actionRow));
        } catch (err) {
            console.error(err);
        }
    };
    const handleChangePage = (page: number) => {
        setPage(page);
    };
    const handleAddTask = async () => {
        try {
            const response = await axiosClient.post(`task/creating`, {
                ...task,
                userId: userSelector.id,
            });
            dispatch(addTask(response.data));
        } catch (err) {
            console.error(err);
        }
    };
    const handleUpdateTask = async () => {
        try {
            const response = await axiosClient.put(`task/update-task/${actionRow}`, {
                ...task,
                userId: userSelector.id,
            });
            dispatch(updateTask(response.data));
        } catch (err) {
            console.error(err);
        }
    };
    const handleDeleteTask = async () => {
        try {
            await axiosClient.delete(`task/delete/${actionRow}`);
            dispatch(deleteTask(actionRow));
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="dashboard">
            <DefaultLayout>
                <div className="page-heading">

                    Dashboard
                </div>
                <div className="page-content">
                    <div className="search-box">
                        <InputGroup>
                            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                            <Form.Control
                                placeholder="Enter title or category"
                                onChange={(e) => {setTimeout(() => {
                                    setSeachString(e.target.value);
                                }, 500);}}
                            />
                        </InputGroup>
                        <Button className="add-btn" onClick={() => {
                            setShow("add");
                            setModalContent("New task");
                        }}>Add task</Button>
                    </div>
                    <div className="task-table">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Created at</th>
                                    <th>Complete at</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks?.map((task, index) => (
                                    <tr key={index} className="task-table-row">
                                        <th>
                                            <Form.Check
                                                type="checkbox"
                                                defaultChecked ={task.status === 1 ? true : false}
                                                // checked={task.status === 1 ? true : false}
                                                
                                                onClick={() => {
                                                    setActionRow(task.id);
                                                    if (task.status === 0) {
                                                        setShow('complete');
                                                        setModalContent("Are you complete this task ?");
                                                    } else {
                                                        setShow('unComplete');
                                                        setModalContent("Are you doing this task ?");
                                                    }
                                                }}
                                            />
                                        </th>
                                        <th>{index + 1}</th>
                                        <th>{task.title}</th>
                                        <th>{task.category}</th>
                                        <th>{task.status === 1 ? <p className="border border-success rounded-pill text-center ">Done</p> : <p className="border border-danger rounded-pill text-center ">Doing</p>}</th>
                                        <th>{changeDateFormat(task.createAt)}</th>
                                        <th>{task.completeAt ? changeDateFormat(task.completeAt) : null}</th>
                                        <th className="task-table-row-action-buttons">
                                            <Button variant="outline-secondary" onClick={() => {
                                                setActionRow(task.id);
                                                setTask(task);
                                                setModalContent("Update Task");
                                                setShow("update");
                                                
                                            }}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button variant="outline-danger" onClick={() => {
                                                setModalContent("Are you want delete this task?");
                                                setActionRow(task.id);
                                                setShow("delete");
                                            }}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="pagination d-flex justify-content-center mb-0">
                        <PaginationBasic totalPages={metadata.totalPages} onChangePage={(page: number) => handleChangePage(page)} currentPage={page} />
                    </div>
                </div>
                <ConfirmModal show={show === 'complete'} onClose={handleCloseModal} onConfirm={handleDonetask} modalContent={modalContent} />
                <ConfirmModal show={show === 'unComplete'} onClose={handleCloseModal} onConfirm={handleUnCompletedTask} modalContent={modalContent} />
                <ConfirmModal show={show === 'delete'} onClose={handleCloseModal} onConfirm={handleDeleteTask} modalContent={modalContent} />
                <TaskModal show={show === 'add'} onClose={handleCloseModal} modalTitle={modalContent} task={task} onChangeInfo={handleChangeTaskInfo} onConfirm={handleAddTask} categories={categories}/>
                <TaskModal show={show === 'update'} onClose={handleCloseModal} modalTitle={modalContent} task={task} onChangeInfo={handleChangeTaskInfo} onConfirm={handleUpdateTask} categories={categories} />
            </DefaultLayout>
        </div>
    );
}