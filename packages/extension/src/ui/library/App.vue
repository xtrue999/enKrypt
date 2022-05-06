<template>
  <div class="library__container">
    <logo class="library__logo"></logo>

    <library-buttons></library-buttons>
    <library-inputs></library-inputs>
  </div>
</template>

<script setup lang="ts">
import Logo from "@action/icons/common/logo.vue";
import LibraryButtons from "./components/library-buttons.vue";
import LibraryInputs from "./components/library-inputs.vue";
</script>

<style lang="less">
@import "~@action/styles/theme.less";

body {
  width: 100vw;
  height: auto;
  margin: 0;
  overflow: hidden;
  font-size: 0;
}

.library {
  &__logo {
    position: absolute;
    left: 32px;
    top: 28px;
  }

  &__back {
    position: absolute;
    top: 8px;
    left: 8px;
    border-radius: 8px;
    cursor: pointer;
    padding: 8px;

    &:hover {
      background: @black007;
    }
  }

  &__container {
    background-color: @lightBg;
    width: 100vw;
    height: auto;
    position: relative;
    padding: 80px 32px 80px 32px;
    min-height: 100vh;
    box-sizing: border-box;
  }
}
</style>
