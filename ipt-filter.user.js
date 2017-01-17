// ==UserScript==
// @name iPT filter
// @namespace http://github.com/nightbread
// @version 0.3
// @encoding utf-8
// @license https://opensource.org/licenses/MIT
// @homepage https://github.com/nightbread/userscripts
// @description Do not use.
// @author nightbread
// @include https://iptorrents.eu/t*
// @updateURL https://raw.githubusercontent.com/nightbread/userscripts/master/ipt-filter.user.js
// @downloadURL https://raw.githubusercontent.com/nightbread/userscripts/master/ipt-filter.user.js
// @supportURL https://github.com/nightbread/userscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    const xvidIPTTeam = /XviD-iPT Team/;
    const removeRegexes = [
        /^ElectroSluts/,
        /^DeviceBondage/,
        /^NetVideoGirls/,
        /^WildOnCam/,
        /^Czech[CMS]/,
        /^Only\-Secretaries/,
        /^ATK[A-Z]/,
        /^Passion\-HD/,
        /^FullyClothed/,
        /^Karups[A-Z]/,
        /^DigitalPlayground/,
        /^AuntJudys/,
        /^MontysPOV/,
        /^Naked News/i,
        /^WowGirls/i,
        /^AllFineGirls/,
        /^Euro(?:SexParties|TeenErotica|GirlsOnGirls)/,
        /^DontBreakMe/,
        /^1By\-Day/,
        /^FemJoy/,
        /^Playboy[A-Z]/,
        /^All(?:Over30|Internal)/,
        /^(?:BoxTruck|Sneaky)Sex/,
        /^BangBrosClips/,
        /^SinsLife/,
        /^DeepThroatSirens/,
        /^Big(?:GulpGirls|Naturals)/,
        /^JulesJordan/,
        /^MySistersHotFriend/,
        /^MetArtX?/,
        /^MeloneChallenge/,
        /(?:SPANISH|ITALIAN|FRENCH|DUTCH) XXX/i,
        /^Hegre/,
        /^Nubile(?:s|Films)/,
        /^Anilos/,
        /^CumFiesta/,
        /^(?:VI|WetAnd)P(issy|uffy)/,
        /^ImmoralLive/,
        /^DoctorAdventures/,
        /^Pornstar(Platinum|sLikeItBig)/,
        /^TeensLikeItBig/,
        /^InnocentHigh/,
        /^X\-Angels/,
        /^ReadyOrNot/,
        /^MomXXX/,
        /^Colette/,
        /^Throated/,
        /^HardX/,
        /^BlackIsBetter/,
        /^TheLifeErotic/,
        /^Spizoo/,
        /^SweetSinner/,
        /^PixAndVideo/,
        /^HotLegsAndFeet/,
        /^DDFBusty/,
        /^GloryHoleVoyeurs/,
        /^KinkyFamily/,
        /^Only\-Opaques/,
        /^Porn(?:Fidelity|MegaLoad)/,
        /^(?:Lub|Hol)ed/,
        /^LANewGirl/,
        /^PunishTeens/,
        /^TeenPies/,
        /^Public(?:Disgrace|PickUps|Agent)/i,
        /^Vixen/,
        /^Anal\-Beauty/,
        /^(?:Female)?Fake(?:Cop|Agent|Taxi)/,
        /^TheFuckingRoom/,
        /^FamilyStrokes/,
        /^ExxxtraSmall/,
        /^Dirty\-Doctor/,
        /^MyFriendsHotGirl/,
        /^SisLovesMe/,
        /^HollyRandall/,
        /^Black(?:ed|GFs)/i,
        /^(?:Fitness|Massage)Rooms/,
        /^LivingWithAPornstar/,
        /^(?:Backroom)?CastingCouch/,
        /^AssParade/,
        /^MyFirstSexTeacher/,
        /^ALSScan/,
        /^PlumperPass/,
        /^Paintoy/,
        /^DigitalDesire/,
        /^GFRevenge/,
        /^BrokeModel/,
        /^SinfulXXX/,
        /^HerLimit/,
        /^UpHerAsshole/,
        /^MILF(?:Hunter|sLikeItBig)/i,
        /^TakeVan/,
        /^NewSensations/,
        /^Bang\s?Casting/,
        /^VintageFlash/,
        /^StreetBlowJobs/i,
        /^ShareMyBF/,
        /^BigTitsAtWork/,
        /^DPFanatics/,
        /^FootsieBabes/,
        /^21(?:EroticAnal|Naturals)/,
        /^Cosmid/,
        /^SapphicErotica/,
        /^AbbyWinters/,
        /^X\-Art/,
        /^Only(?:Tease|SilkAndSatin)/,
        /^PrivateSociety/,
        /^DadCrush/,
        /^TwistysHard/,
        /^ALSAngels/,
        /^FemaleAgent/,
        /^JoshStoneXXX/,
        /^Girlfriends\s(?:[0-9]{2}\s){3}/,
        /^(?:Mean|Fantasy)Massage/,
        /^(?:WoodmanCasting|Brutal)X/,
        /^XXX(?: Pawn|Shades)/,
        /^ColombiaFuckFest/,
        /^IHaveAWife/,
        /^FuckedInTraffic/,
        /^Relaxxxed/,
        /^MonsterCurves/,
        /^VelvetEcstacy/,
        /^HandsOnHardcore/,
        /^DirtyMasseur/,
        /^TeachMeFisting/,
        /^BurningAngel/,
        /^ButtPlays/,
        /^AssholeFever/,
        /^LetsTryAnal/,
        /^Killergram/,
        /^Sex(?:AndSubmission|uallyBroken)/,
        /^Tushy/,
        /^VivThomas/,
        /^PervyOnes/,
        /^TMWVRNet/i,
        /^TheRealWorkout/,
        /^DaughterSwap/,
        /^Ex\-Girlfriends/,
        /^DaneJones/,
        /^BlacksOn/,
        /^FutileStruggles/,
        /^TeensLoveAnal/,
        /^StreetSuckers/,
        /^SinsLife/,
        /^MikesApartment/,
        /^Bang\s?RealTeens/,
        /^HouseOfTaboo/i,
        /^Pantyhosed4U/i,
        /^RealWifeStories/,
        /^GrandpasFuckTeens/,
        /^MommyBlowsBest/,
        /^StepMomLessons/i,
        /^POVBitch/i,
        /^BashBastards/,
        /^MormonGirlz/,
        /^(?:The)?UpperFloor/,
        /LANewGirl/,
        /OldYoung/
    ];
    const lesbo = /\blesb(?:ian|o)\b/i;
    const SELECTOR = '#torrents > tbody > tr > td > a';

    Array.from(document.querySelectorAll(SELECTOR)).forEach(function(el, i) {
        const row = el.parentElement.parentElement;

        if (xvidIPTTeam.test(el.innerText)) {
            row.remove();
            return;
        }

        removeRegexes.forEach(function (regex, i) {
            if (regex.test(el.innerText) && !lesbo.test(el.innerText)) {
                row.remove();
            }
        });
    });
})();
