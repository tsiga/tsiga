(function ($) {

    "use strict";

    // PRE LOADER
    $(window).load(function () {
        $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    //Navigation Section
    $('.navbar-collapse a').on('click', function () {
        $(".navbar-collapse").collapse('hide');
    });

})(jQuery);

var katzEngine = new Vue({
    el: '#katzCalcul',
    methods: {
        reset(){
            this.finalValue = "";
            this.rate = null;
            this.combined = false;
            this.dsm = false;
            this.resetAllSteps(null);
            this.resetSelectedScore();
            toastr.success("Remis à zéro !");
        },
        computeFinalValue() {
            let scores = [];
            let textResult = "";
            for (let crit of this.criterias) {
                scores.push(crit.selectedScore)
            }
            this.rate = scores;

            if (this.isCPace(scores)) {
                textResult = 'Forfait C';
            } else if (this.isBPace(scores)) {
                textResult = 'Forfait B';
            } else if (this.isAPace(scores)) {
                textResult = 'Forfait A';
            } else if (this.isSevenTimesAWeek(scores)) {
                textResult = 'Toilettes 7 fois par semaine';
            } else if (this.isTwoTimesAWeek(scores)) {
                textResult = 'Toilettes 2 fois par semaine';
            }

            if(textResult != "") toastr.success(textResult, "Résultat : ");

            return textResult;
        },
        isCPace(scores) {
            return (scores[0] >= 4 && scores[1] >= 4 && scores[2] >= 4 && scores[3] >= 4 && scores[4] >= 3 && scores[5] >= 3 && (scores[4] == 4 || scores[5] == 4)) ? true : false;
        },
        isBPace(scores) {
            return (scores[0] >= 3 && scores[1] >= 3 && scores[2] >= 3 && scores[3] >= 3 && (scores[4] >= 3 || scores[5] >= 3)) ? true : false;
        },
        isAPace(scores) {
            return (scores[0] >= 3 && scores[1] >= 3 && (scores[2] >= 3 || scores[3] >= 3)) ? true : false;
        },
        isSevenTimesAWeek(scores) {
            if ((scores[0] >= 2 && scores[1] >= 2 && (scores[4] >= 3 || (scores[4] == 2 && this.combined))) ||
                (scores[0] >= 2 && scores[1] >= 2 && this.dsm) ||
                (scores[0] >= 4 && scores[1] >= 4)) {
                return true;
            }
            return false;
        },
        isTwoTimesAWeek(scores) {
            return scores[0] >= 2;
        },
        selectScore(id, score) {
            // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
            let criteria = this.criterias.find(e => {
                return e.id == id;
            });
            criteria.selectedScore = score;

            this.resetAllSteps(criteria);

            let selectedStep = criteria.steps[score - 1];
            selectedStep.selected = true;

            let anyWithoutScore = this.criterias.find(e => {
                return e.selectedScore == null;
            });

            if (anyWithoutScore == undefined) {
                this.finalValue = this.computeFinalValue();
            }
        },
        resetAllSteps(criteria){
            if(criteria == null){
                for(let criteria of this.criterias){
                    for (let step of criteria.steps) {
                        if(step.score == 1){
                            step.selected = true;
                            continue;
                        } 
                        step.selected = false;
                    }
                }
            }else{
                for (let step of criteria.steps) {
                    step.selected = false;
                }
            }
        },
        resetSelectedScore(){
            for(let criteria of this.criterias){
                criteria.selectedScore = 1;
            }
        },
        setCombined(isCombined) {
            this.combined = isCombined;
            this.finalValue = this.computeFinalValue();
        },
        setDsm(isDsm) {
            this.dsm = isDsm;
            this.finalValue = this.computeFinalValue();
        }
    },
    data: {
        finalValue: "",
        rate: null,
        combined: false,
        dsm: false,
        criterias: [{
                id: 1,
                text: 'Se laver',
                selectedScore: 1,
                steps: [{
                        text: 'est capable de se laver complètement sans aucune aide',
                        score: 1,
                        selected: true
                    },
                    {
                        text: 'a besoin d\'une aide partielle pour se laver au dessus ou en dessous de la ceinture',
                        score: 2,
                        selected: false
                    },
                    {
                        text: 'a besoin d\'une aide partielle pour se laver tant au dessus qu\'en dessous de la ceinture',
                        score: 3,
                        selected: false
                    },
                    {
                        text: 'doit être entièrement aidé pour se laver tant au dessus qu\'en dessous de la ceinture',
                        score: 4,
                        selected: false
                    }
                ]
            },
            {
                id: 2,
                text: 'S\'habiller',
                selectedScore: 1,
                steps: [{
                        text: 'est capable de s\'habiller et de se déshabiller complètement sans aucune aide',
                        score: 1,
                        selected: true
                    },
                    {
                        text: 'a besoin d\'une aide partielle pour s\'habiller au-dessus ou en dessous de la ceinture (sans tenir compte des lacets)',
                        score: 2,
                        selected: false
                    },
                    {
                        text: 'a besoin d\’une aide partielle pour s\’habiller tant au-dessus qu\’en dessous de la ceinture',
                        score: 3,
                        selected: false
                    },
                    {
                        text: 'doit être entièrement aidé pour s\’habiller tant au-dessus qu\’en dessous de la ceinture',
                        score: 4,
                        selected: false
                    }
                ]
            },
            {
                id: 3,
                text: 'Transfert et déplacement',
                selectedScore: 1,
                steps: [{
                        text: 'est autonome pour le transfert et se déplace de façon entièrement indépendante, sans auxiliaire(s) mécanique(s), ni aide de tiers',
                        score: 1,
                        selected: true
                    },
                    {
                        text: 'est autonome pour le transfert et ses déplacements moyennant l\’utilisation d\’auxiliaire(s) mécanique(s) (béquille(s), chaise roulante…)',
                        score: 2,
                        selected: false
                    },
                    {
                        text: 'a absolument besoin de l\’aide de tiers pour au moins un des transferts et/ou ses déplacements',
                        score: 3,
                        selected: false
                    },
                    {
                        text: 'est grabataire ou en chaise roulante et dépend entièrement des autres pour se déplacer',
                        score: 4,
                        selected: false
                    }
                ]
            },
            {
                id: 4,
                text: 'Aller à la toilette',
                selectedScore: 1,
                steps: [{
                        text: 'est capable d\’aller seul à la toilette, de s\’habiller et de s\’essuyer',
                        score: 1,
                        selected: true
                    },
                    {
                        text: 'a besoin d\’aide pour un des trois items: se déplacer ou s\’habiller ou s\’essuyer',
                        score: 2,
                        selected: false
                    },
                    {
                        text: 'a besoin d\’aide pour deux des trois items: se déplacer et/ou s\’habiller et/ou s\’essuyer',
                        score: 3,
                        selected: false
                    },
                    {
                        text: 'doit être entièrement aidé pour les trois items: se déplacer et s\’habiller et s\’essuyer',
                        score: 4,
                        selected: false
                    }
                ]
            },
            {
                id: 5,
                text: 'Continence',
                selectedScore: 1,
                steps: [{
                        text: 'est continent pour les urines et les selles',
                        score: 1,
                        selected: true
                    },
                    {
                        text: 'est accidentellement incontinent pour les urines ou les selles (sonde vésicale ou anus artificiel compris)',
                        score: 2,
                        selected: false
                    },
                    {
                        text: 'est incontinent pour les urines (y compris exercices de miction) ou les selles ',
                        score: 3,
                        selected: false
                    },
                    {
                        text: 'est incontinent pour les urines et les selles',
                        score: 4,
                        selected: false
                    }
                ]
            },
            {
                id: 6,
                text: 'Manger',
                selectedScore: 1,
                steps: [{
                        text: 'est capable de manger et de boire seul',
                        score: 1,
                        selected: true
                    },
                    {
                        text: 'a besoin d\’une aide préalable pour manger ou boire',
                        score: 2,
                        selected: false
                    },
                    {
                        text: 'a besoin d\’une aide partielle pendant qu\’il mange ou boit',
                        score: 3,
                        selected: false
                    },
                    {
                        text: 'le patient est totalement dépendant pour manger ou boire',
                        score: 4,
                        selected: false
                    }
                ]
            }
        ]
    }
})