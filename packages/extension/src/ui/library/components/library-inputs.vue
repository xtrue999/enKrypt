<template>
  <div class="library__block">
    <h3>Inputs</h3>
    <div class="library__block-items">
      <div class="library__block-item inline">
        <Switch /> <span class="library__block-item-span">Switch</span>
      </div>
      <div class="library__block-item inline">
        <BaseCheckbox />
        <span class="library__block-item-span">Base checkbox</span>
      </div>
      <div class="library__block-item">
        <base-input type="text" value="" placeholder="Base input" />
      </div>
      <div class="library__block-item list">
        <list-search type="text" value="" placeholder="List search" />
      </div>
      <div class="library__block-item network">
        <base-search :is-border="false" />
      </div>
      <div class="library__block-item">
        <base-search :is-border="true" />
      </div>

      <div class="library__block-item list">
        <base-select
          title="Language"
          :select="selecLanguage"
          :value="language"
          :list="languageList"
        ></base-select>
      </div>

      <div class="library__block-item">
        <PhraseCheckbox :is-checked="false" title="Phrase" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LibraryInputs",
};
</script>

<script setup lang="ts">
import { ref } from "vue";

import Switch from "@action/components/switch/index.vue";
import BaseCheckbox from "@action/components/base-checkbox/index.vue";
import BaseInput from "@action/components/base-input/index.vue";
import ListSearch from "@action/components/list-search/index.vue";
import BaseSearch from "@action/components/base-search/index.vue";
import BaseSelect from "@action/components/base-select/index.vue";
import PhraseCheckbox from "@action/components/phrase-checkbox/index.vue";

const languageList = ["English", "Russian"];
let language = ref("English");
const selecLanguage = (value: string) => {
  language.value = value;
};
</script>

<style lang="less">
@import "~@action/styles/theme.less";

.library {
  &__block-item {
    position: relative;

    &-span {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: @primaryLabel;
      display: block;
      margin-left: 8px;
    }

    &.inline {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    &.list {
      height: 56px;
      width: 300px;
    }

    &.network {
      .app-search {
        margin: 0 !important;
      }
    }

    .base-select__container {
      margin: 0 !important;
    }
  }
}
</style>
