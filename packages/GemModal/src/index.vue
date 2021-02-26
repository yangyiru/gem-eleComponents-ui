<template>
    <div>
        {{ dialogVisible }}
        <Dialog :title="title" :visible.sync="dialogVisible" :width="width">
            <slot></slot>
            <template #footer>
                <slot name="footer"> </slot>
            </template>
        </Dialog>
    </div>
</template>

<script>
import { Dialog } from 'element-ui'; //按需引入
export default {
    name: 'GemModal',
    components: {
        Dialog,
    },
    props: {
        title: {
            // 标题
            type: String,
            defalut: '',
        },
        value: {
            type: Boolean,
            defalut: () => false,
        },
        width: {
            type: String,
            defalut: () => '50%',
        },
    },
    data() {
        return {
            // dialogVisible: this.value
        };
    },
    computed: {
        dialogVisible: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('update:visible', val);
            },
        },
    },
    // watch: {
    //     value(newVal) {
    //         this.dialogVisible = newVal
    //     }
    // },
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    // 方法集合
    methods: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
};
</script>

<style scoped></style>
