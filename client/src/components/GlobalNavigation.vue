<template>
  <div class="w-16 bg-blue-900">
    <div class="flex flex-col h-full py-6">
      <div class="px-3 text-white space-y-4">
        <UiAvatar
          inline
          username="Logo"
          :size="40"
        />
      </div>
      <div class="mt-auto px-4">
        <UiDropdown placement="right-end">
          <template #trigger>
            <UiAvatar
              :username="user.name"
              :size="32"
            />
          </template>

          <div class="rounded shadow-lg">
            <div class="rounded shadow-xs bg-white w-56 divide-y divide-gray-100">
              <ul class="py-1">
                <li>
                  <RouterLink
                    to="/logout"
                    class="block px-4 py-2 hover:bg-gray-200 text-sm leading-5"
                  >
                    Logout
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </UiDropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'GlobalNavigation',
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user);

    return {
      user,
    };
  },
};
</script>
