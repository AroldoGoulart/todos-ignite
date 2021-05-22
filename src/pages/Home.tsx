import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(newTaskTitle) {
      const newDate = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldState => [...oldState, newDate])
    }
  }

  function handleMarkTaskAsDone(id: number) {
    let tasksChanged = tasks
    if(tasksChanged[id]) {
      tasksChanged[id] = {
        ...tasksChanged[id],
        done: !tasksChanged[id].done,
      }
    }
    setTasks(tasksChanged)
  }

  function handleRemoveTask(id: number) {
    let tasksChanged = tasks
    if(tasksChanged[id]) {
      let newList = []
      for(let i=0; i < tasksChanged.length; i++) {
        if(id !== i) {
          newList[i] = tasksChanged[i]
        }
      }
      setTasks(newList)
    }
  }

  return (
    <>
      <Header />
      <TodoInput addTask={handleAddTask} />
      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}