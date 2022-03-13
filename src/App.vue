<script setup>
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import orderBy from 'lodash/orderBy'

const participants = useStorage('participants', [])

const name = ref(null)
const request = ref(null)
const nameInput = ref(null)

const participantsOrdered = computed(() => {
  return orderBy(participants.value, ['prayed'], ['asc'])
})

function addRequest () {
  participants.value.push({
    name: name.value,
    request: request.value,
    prayed: ref(false),
  })

  name.value = null
  request.value = null

  // foca no nome
  nameInput.value.focus()
}

</script>

<template>
  <div class="bg-green-300 h-screen">
    <div class="container mx-auto">
      <div class="font-bold p-4 mb-10 border-b">
        <h1 class="text-3xl text-center">Pedidos de Oração IPBBN</h1>
      </div>

      <div class="grid grid-cols-2">
        <div>
          <div class="flex flex-col p-4">
            <label for="name" class="font-bold">Nome:</label>
            <input v-model="name" ref="nameInput" type="text" id="name" class="border rounded-md px-2 py-2" placeholder="Informe o nome">
          </div>

          <div class="flex flex-col p-4">
            <label for="name" class="font-bold">Pedido</label>
            <textarea v-model="request" rows="3" maxlength="500" class="border rounded-md px-2 py-2" placeholder="Descreva a oração" />
          </div>

          <div class="p-4">
            <button type="button" class="bg-green-800 px-4 py-2 rounded-md text-white" @click="addRequest" @keyup.tab="addRequest">Adicionar pedido</button>
          </div>
        </div>

        <div class="p-4">
          <TransitionGroup name="list" tag="ul">
            <li v-for="(participant, index) of participantsOrdered" :key="participant.name">
              <div :class="participant.prayed ? 'border-green-800' : 'border-red-500'" class="bg-white border-l-8 px-3 py-2 mb-4 rounded-md">
                <div class="flex justify-between items-center border-b mb-2">
                  <h3 class="capitalize text-xl font-bold py-1">
                    {{ participant.name }}
                  </h3>
                  <div>
                    <label :for="`participant-${index}`" class="cursor-pointer mr-2">
                      Já orou?
                    </label>
                    <input v-model="participant.prayed" :id="`participant-${index}`" :name="`participant-${index}`" type="checkbox" />
                  </div>
                </div>
                <p class="py-2 text-gray-600">{{ participant.request }}</p>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>