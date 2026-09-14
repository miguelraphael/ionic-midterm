<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Daily Tasks</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="isOpen = true">Add Task</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="task in tasks" :key="task.id">
          <ion-label>
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <p>Due: {{ task.dueDate }} | Priority: {{ task.priority }}</p>
          </ion-label>
          
          <ion-badge :color="task.status === 'Completed' ? 'success' : 'warning'" slot="end">
            {{ task.status }}
          </ion-badge>
          
          <ion-button v-if="task.status === 'Pending'" fill="clear" color="success" slot="end" @click="completeTask(task.id)">
            Complete
          </ion-button>
          
          <ion-button fill="clear" color="danger" slot="end" @click="deleteTask(task.id)">
            Delete
          </ion-button>
        </ion-item>
      </ion-list>

      <!-- Add Task Modal -->
      <ion-modal :is-open="isOpen" @didDismiss="isOpen = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>New Task</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="isOpen = false">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input v-model="newTask.title" label="Title" label-placement="floating"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="newTask.description" label="Description" label-placement="floating"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="newTask.dueDate" type="date" label="Due Date" label-placement="floating"></ion-input>
          </ion-item>
          <ion-item>
            <ion-select v-model="newTask.priority" label="Priority" label-placement="floating">
              <ion-select-option value="Low">Low</ion-select-option>
              <ion-select-option value="Medium">Medium</ion-select-option>
              <ion-select-option value="High">High</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button expand="block" class="ion-margin-top" @click="addTask">Save Task</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonBadge, IonButtons, 
  IonButton, IonModal, IonInput, IonSelect, IonSelectOption 
} from '@ionic/vue';
import { collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'vuefire';

import { db } from '../utils/firebase';
import type { Task } from '../types/Task';

const isOpen = ref(false);

const tasks = useCollection(collection(db, 'tasks'));

const newTask = ref<Task>({
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
  status: 'Pending'
});

const addTask = async () => {
  if (!newTask.value.title) return;
  
  await addDoc(collection(db, 'tasks'), { ...newTask.value });
  
  newTask.value = { title: '', description: '', dueDate: '', priority: 'Medium', status: 'Pending' };
  isOpen.value = false;
};

const completeTask = async (id: string) => {
  if (!id) return;
  await updateDoc(doc(db, 'tasks', id), { status: 'Completed' });
};

const deleteTask = async (id: string) => {
  if (!id) return;
  await deleteDoc(doc(db, 'tasks', id));
};
</script>
