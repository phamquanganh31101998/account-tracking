<template>
    <v-tooltip top v-model="compareValueToolTip">
        <!-- <template v-slot:activator="{ on }">
        <i class="material-icons" v-on="on" :style="getColor(detail.isWarning)">brightness_1</i>
        {{checkNumberValue(detail.currentValue)}} {{getCurrency(detail.type, item.currency)}} {{checkRate(detail.type)}}
        </template> -->
        <template>
            <v-container>
                <v-row>
                <v-col>
                    Giá trị cũ: {{checkNumberValue(compareValue.previousValue)}} {{getCurrency(compareValue.type, compareValue.currency)}} {{checkRate(compareValue.type)}}
                    <br>
                </v-col>
                </v-row>
                <v-row>
                <i class="material-icons" v-if="compareValue.isWarning">trending_down</i>
                <i class="material-icons" v-else>trending_up</i>
                <p :style="getColor(compareValue.isWarning)">: {{checkNumberValue(compareValue.changeValue)}} %</p>
                </v-row>
            </v-container>
        </template>
    </v-tooltip>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed: {
		...mapGetters({
            compareValue: 'compareValue',
            compareValueToolTip: 'compareValueToolTip'
		})
	},
    methods: {
        getColor (isWarning) {
			if (isWarning == true){
				return "color: #F4516C;"
			}
			else {
				return "color: #34BFA3;"
			}
        },
        checkNumberValue(example){
			if(example==null){
				return '-'
			}
			else {
				if (this.isFloat(example)){
				return numberFormat.number_format(example, 2);
				}
				else {
				return this.format(example);
				}
			}
        },
        getCurrency(type, type1) {
			if (type == "SPEND" || type == 'REMAIN_BUDGET') {
				return type1
			} else return null
        },
        checkRate(type) {
			if (type == "CR" || type == 'IS' || type == 'EXACT_IS' || type == 'BUDGET_LOST_IS' || type == 'RANK_LOST_IS') {
				return '%'
			} else return null
		},
    }
}
</script>
<style>

</style>