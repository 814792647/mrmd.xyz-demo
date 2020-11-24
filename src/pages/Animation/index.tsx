import React, { useEffect } from 'react';
import './index.scss'
import ScrollMagic from 'scrollmagic';
import { gsap,TimelineLite, TweenLite } from 'gsap';

interface Props {
    location: any;
}

const Index = (props: Props) => {

    useEffect(() => {
        document.title = "Hi-WeiBin.Chen"
        gsap.registerPlugin(TimelineLite, TweenLite); 
        let controller = new ScrollMagic.Controller();
        let one = new TimelineLite();
        one.add(TweenLite.to(document.getElementById("hi_us"), 1, { opacity: 0 }));
        one.add(TweenLite.to(document.getElementById("hi_cn"), 1, { opacity: 1 }));
        one.add(TweenLite.to(document.getElementById("hi_cn"), 1, { opacity: 0 }));
        one.add(TweenLite.to(document.getElementById("hi_jp"), 1, { opacity: 1 }));
        one.add(TweenLite.to(document.getElementById("hi_jp"), 1, { opacity: 0 }));
        one.add(TweenLite.to(document.getElementById("hi_kr"), 1, { opacity: 1 }));
        one.add(TweenLite.to(document.getElementById("hi_kr"), 1, { opacity: 0 }));
        one.add(TweenLite.to(document.getElementById("hi_ru"), 1, { opacity: 1 }));
        one.pause();

        new ScrollMagic.Scene({
            duration: window.innerHeight * 2.5,
            triggerHook: 0,
            triggerElement: "#one"
        }).setPin("#one").addTo(controller).on("progress", (e: any) => {
            one.seek(e.progress * 8)
        }).on("end",() => {
            if(Boolean(props.location.search)){
                let url = props.location.search.replace("?url=","")
                window.location.href = url;
            }
        })

    }, [])


    return (
        <div>
            <div className="main" id="one">
                <div id="controller1" className="scene">
                    <p id="hi_us" style={{ fontSize: "270px" }}>Hi</p>
                    <p id="hi_cn" style={{ opacity: 0, fontSize: "180px" }}>你好</p>
                    <p id="hi_jp" style={{ opacity: 0 }}>こんにちは</p>
                    <p id="hi_kr" style={{ opacity: 0 }}>안녕하세요</p>
                    <p id="hi_ru" style={{ opacity: 0 }}>Здравствыйте</p>
                </div>
            </div>

            <div className="square">
                <p>My</p>
                <p>WebSite</p>
                <p>WeiBin.Chen</p>
            </div>
        </div>
    )
}

export default Index
