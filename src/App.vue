<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
    />

    <van-rate v-model="value" />

  </div>
</template>

<script>

export default {

  data() {
    return {
      value: 4,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
    };
  },
};
</script>

<style>
</style>