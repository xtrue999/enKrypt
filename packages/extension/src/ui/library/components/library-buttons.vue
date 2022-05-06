<template>
  <div class="library__block">
    <h3>Buttons</h3>
    <div class="library__block-items">
      <div class="library__block-item">
        <base-button title="Button"></base-button>
      </div>
      <div class="library__block-item">
        <base-button title="Disabled button" :disabled="true"></base-button>
      </div>
      <div class="library__block-item">
        <base-button
          title="No background button"
          :no-background="true"
        ></base-button>
      </div>
      <div class="library__block-item">
        <base-button title="Gray button" :gray="true"></base-button>
      </div>
      <div class="library__block-item">
        <base-button title="Red button" :red="true"></base-button>
      </div>
      <div class="library__block-item">
        <base-button title="Orange button" :orange="true"></base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LibraryButtons",
};
</script>

<script setup lang="ts">
import BaseButton from "@action/components/base-button/index.vue";
</script>

<style lang="less">
@import "~@action/styles/theme.less";

.library {
  &__block {
    margin: 0 0 16px 0;

    h3 {
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      letter-spacing: 0.15px;
      color: @primaryLabel;
      margin: 0 0 16px 0;
    }

    &-items {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }

    &-item {
      width: 200px;
      margin-bottom: 16px;
      margin-right: 16px;
    }
  }
}
</style>
