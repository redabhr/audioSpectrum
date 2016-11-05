window.onload = function () {
    var el = document.getElementById("music");
    var app = redaMusicSpectrum.Bootstrapper.init();
    app.launch(el);
};

var redaMusicSpectrum;
(function (redaMusicSpectrum) {
    var Bootstrapper = (function () {
        function Bootstrapper() {
            if (Bootstrapper._spectrum) {
                throw new Error("Error: Instantiation failed: try init() instead of new.");
            }
            Bootstrapper._spectrum = this;
        }
        Bootstrapper.init = function () {
            return Bootstrapper._spectrum;
        };
        Bootstrapper.prototype.launch = function (canvas) {
            var cnv = canvas;
            if (this.checkWebGlSupport(cnv)) {
                var width_1 = window.innerWidth;
                var height_1 = window.innerHeight;
                cnv.width = width_1;
                cnv.height = height_1;
                var Audiocontext_1 = new AudioContext();
                var CanvasContext_1 = cnv.getContext("2d");
                var sourceNode_1;
                var analyser_1;
                var javascriptNode = void 0;
                var audioBuffer = void 0;
                var url = "../audio/Alan Walker - Fade [NCS Release].mp3";
                var gradient_1 = CanvasContext_1.createLinearGradient(0, 0, 0, height_1 / 2);
                gradient_1.addColorStop(0, '#aac8de');
                gradient_1.addColorStop(0.25, '#44a1e2');
                gradient_1.addColorStop(0.75, '#0d83d5');
                gradient_1.addColorStop(1, '#005a99');
                javascriptNode = Audiocontext_1.createScriptProcessor(2048, 1, 1);
                javascriptNode.connect(Audiocontext_1.destination);
                analyser_1 = Audiocontext_1.createAnalyser();
                analyser_1.smoothingTimeConstant = 0.4;
                analyser_1.fftSize = 1024;
                sourceNode_1 = Audiocontext_1.createBufferSource();
                var request_1 = new XMLHttpRequest();
                request_1.open('GET', url, true);
                request_1.responseType = 'arraybuffer';
                request_1.onload = function () {
                    Audiocontext_1.decodeAudioData(request_1.response, function (buffer) {
                        sourceNode_1.buffer = buffer;
                        sourceNode_1.start(0);
                    }, function onError(e) {
                        console.log(e);
                    });
                };
                request_1.send();
                sourceNode_1.connect(analyser_1);
                analyser_1.connect(javascriptNode);
                sourceNode_1.connect(Audiocontext_1.destination);
                javascriptNode.onaudioprocess = function () {
                    var array = new Uint8Array(analyser_1.frequencyBinCount);
                    analyser_1.getByteFrequencyData(array);
                    CanvasContext_1.clearRect(0, 0, width_1, height_1);
                    for (var i = 0; i < (array.length); i++) {
                        var value = array[i];
                        CanvasContext_1.fillStyle = gradient_1;
                        CanvasContext_1.fillRect(i * 4, (height_1 / 2) - value, 3, height_1 / 2 - ((height_1 / 2) - value));
                        CanvasContext_1.fillStyle = "#323232";
                        CanvasContext_1.fillRect(i * 4, height_1 / 2, 3, value);
                    }
                };
            }
        };
        Bootstrapper.prototype.checkWebGlSupport = function (canvas) {
            var support = true;
            try {
                canvas.getContext("2d") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                support = true;
            }
            catch (e) {
                canvas = null;
                console.log("WebGL not supported");
                support = false;
            }
            return support;
        };
        Bootstrapper._spectrum = new Bootstrapper();
        return Bootstrapper;
    }());
    redaMusicSpectrum.Bootstrapper = Bootstrapper;
})(redaMusicSpectrum || (redaMusicSpectrum = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyIsImJvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxHQUFHO0lBQ1osSUFBSSxFQUFFLEdBQXlDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEYsSUFBSSxHQUFHLEdBQW1DLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ25CLENBQUMsQ0FBQzs7QUNKRixJQUFVLGlCQUFpQixDQW1IMUI7QUFuSEQsV0FBVSxpQkFBaUIsRUFBQyxDQUFDO0lBQ3pCO1FBRUk7WUFDSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1lBQy9FLENBQUM7WUFDRCxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBQ2EsaUJBQUksR0FBbEI7WUFFSSxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxDQUFDO1FBQ00sNkJBQU0sR0FBYixVQUFjLE1BQW1CO1lBQzdCLElBQUksR0FBRyxHQUFzQixNQUFNLENBQUM7WUFFdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFM0IsSUFBSSxPQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztnQkFDOUIsSUFBSSxRQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFLLENBQUM7Z0JBQ2xCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsUUFBTSxDQUFDO2dCQUtwQixJQUFJLGNBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUV0QyxJQUFJLGVBQWEsR0FBRyxH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KSA9PiB7XHJcbiAgICBsZXQgZWw6IEhUTUxDYW52YXNFbGVtZW50ID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVzaWNcIik7XHJcbiAgICBsZXQgYXBwOiByZWRhTXVzaWNTcGVjdHJ1bS5Cb290c3RyYXBwZXIgPSByZWRhTXVzaWNTcGVjdHJ1bS5Cb290c3RyYXBwZXIuaW5pdCgpO1xyXG4gICAgYXBwLmxhdW5jaChlbCk7XHJcbn07IiwibmFtZXNwYWNlIHJlZGFNdXNpY1NwZWN0cnVtIHtcclxuICAgIGV4cG9ydCBjbGFzcyBCb290c3RyYXBwZXIge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9zcGVjdHJ1bTogQm9vdHN0cmFwcGVyID0gbmV3IEJvb3RzdHJhcHBlcigpO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBpZiAoQm9vdHN0cmFwcGVyLl9zcGVjdHJ1bSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IEluc3RhbnRpYXRpb24gZmFpbGVkOiB0cnkgaW5pdCgpIGluc3RlYWQgb2YgbmV3LlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBCb290c3RyYXBwZXIuX3NwZWN0cnVtID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbml0KCk6IEJvb3RzdHJhcHBlciB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gQm9vdHN0cmFwcGVyLl9zcGVjdHJ1bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGxhdW5jaChjYW52YXM6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBjbnYgPSA8SFRNTENhbnZhc0VsZW1lbnQ+Y2FudmFzO1xyXG4gICAgICAgICAgICAvLyBjaGVjayB3ZWJnbCBzdXBwb3J0XHJcbiAgICAgICAgIGlmICh0aGlzLmNoZWNrV2ViR2xTdXBwb3J0KGNudikpIHtcclxuICAgICAgICAgICAgICAgIC8vcmVzaXplIGNhbnZhc1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY252LndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjbnYuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgLy9zdXBwb3NpbmcgQXVkaW8gd2ViIEFQSSB3b3Jrc1xyXG4gICAgICAgICAgICAgICAgLy93aW5kb3cuQXVkaW9Db250ZXh0ID0gd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSBuZXcgYXVkaW8gY29udGV4dFxyXG4gICAgICAgICAgICAgICAgbGV0IEF1ZGlvY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIGNhbnZhcyBjb250ZXh0XHJcbiAgICAgICAgICAgICAgICBsZXQgQ2FudmFzQ29udGV4dCA9IGNudi5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZU5vZGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYW5hbHlzZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgamF2YXNjcmlwdE5vZGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXVkaW9CdWZmZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IFwiLi4vYXVkaW8vQWxhbiBXYWxrZXIgLSBGYWRlIFtOQ1MgUmVsZWFzZV0ubXAzXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgZ3JhZGllbnRcclxuICAgICAgICAgICAgICAgIGxldCBncmFkaWVudCA9IENhbnZhc0NvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyNhYWM4ZGUnKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjI1LCAnIzQ0YTFlMicpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNzUsICcjMGQ4M2Q1Jyk7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJyMwMDVhOTknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tIFNldHVwIEphdmFzY3JpcHQgTm9kZSAtLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgamF2YXNjcmlwdE5vZGUgPSBBdWRpb2NvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDIwNDgsIDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29ubmVjdCB0byBkZXN0aW5hdGlvbiwgZWxzZSBpdCBpc24ndCBjYWxsZWRcclxuICAgICAgICAgICAgICAgIGphdmFzY3JpcHROb2RlLmNvbm5lY3QoQXVkaW9jb250ZXh0LmRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0gU2V0dXAgQW5hbHlzZXIgTm9kZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIGFuYWx5c2VyID0gQXVkaW9jb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XHJcbiAgICAgICAgICAgICAgICBhbmFseXNlci5zbW9vdGhpbmdUaW1lQ29uc3RhbnQgPSAwLjQ7XHJcbiAgICAgICAgICAgICAgICBhbmFseXNlci5mZnRTaXplID0gMTAyNDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tIFNldHVwIFNvdXJjZSBOb2RlIC0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSBhIGJ1ZmZlciBzb3VyY2Ugbm9kZVxyXG4gICAgICAgICAgICAgICAgc291cmNlTm9kZSA9IEF1ZGlvY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICAgICAgICAgICAgICAvL1doZW4gbG9hZGVkIGRlY29kZSB0aGUgZGF0YVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWNvZGUgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIEF1ZGlvY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSwgZnVuY3Rpb24gKGJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3doZW4gdGhlIGF1ZGlvIGlzIGRlY29kZWQgcGxheSB0aGUgc291bmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlTm9kZS5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZU5vZGUuc3RhcnQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gb25FcnJvcihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Db25uZWN0IGFsbCBub2RlcyB0b2dldGhlclxyXG4gICAgICAgICAgICAgICAgc291cmNlTm9kZS5jb25uZWN0KGFuYWx5c2VyKTtcclxuICAgICAgICAgICAgICAgIGFuYWx5c2VyLmNvbm5lY3QoamF2YXNjcmlwdE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlTm9kZS5jb25uZWN0KEF1ZGlvY29udGV4dC5kZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHdoZW4gdGhlIGphdmFzY3JpcHQgbm9kZSBpcyBjYWxsZWRcclxuICAgICAgICAgICAgICAvLyB3ZSB1c2UgaW5mb3JtYXRpb24gZnJvbSB0aGUgYW5hbHl6ZXIgbm9kZVxyXG4gICAgICAgICAgICAgIC8vIHRvIGRyYXcgdGhlIHZvbHVtZVxyXG4gICAgICAgICAgICAgICAgamF2YXNjcmlwdE5vZGUub25hdWRpb3Byb2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGF2ZXJhZ2UgZm9yIHRoZSBmaXJzdCBjaGFubmVsXHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXkgPSAgbmV3IFVpbnQ4QXJyYXkoYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoYXJyYXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBjdXJyZW50IHN0YXRlXHJcbiAgICAgICAgICAgICAgICBDYW52YXNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIC8vZHJhd1xyXG4gICAgICAgICAgICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IChhcnJheS5sZW5ndGgpOyBpKysgKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBhcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgZmlsbCBzdHlsZVxyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc0NvbnRleHQuZmlsbFN0eWxlPWdyYWRpZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc0NvbnRleHQuZmlsbFJlY3QoaSo0LChoZWlnaHQvMiktdmFsdWUsMyxoZWlnaHQvMi0oKGhlaWdodC8yKS12YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc0NvbnRleHQuZmlsbFN0eWxlPVwiIzMyMzIzMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc0NvbnRleHQuZmlsbFJlY3QoaSo0LGhlaWdodC8yLDMsdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIGNoZWNrV2ViR2xTdXBwb3J0KGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IHN1cHBvcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSB8fCBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIpIHx8IGNhbnZhcy5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIpO1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNhbnZhcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYkdMIG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9