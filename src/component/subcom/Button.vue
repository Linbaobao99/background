<template>
    <div>
        <el-switch v-model="value3" active-text="明天" inactive-text="今天">
        </el-switch>
    </div>
</template>

<script>
export default {
  data() {
    return {
      value3: true,
      value4: true
    };
  }
};
</script>

<style scoped>

</style>