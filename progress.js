const cursor = require('../cursor');

class ProgressBar {
    count = 0;
    length = 100;
    title = '';
    current = 0;
    left = 0;
    top = 0;
    position = 0;
    titleLength = 0;
    open = '[';
    close = ']';
    fill = '.';
    inline = process.stdout.isTTY;

    constructor(count, length, title) {
        this.count = count;
        this.length = length || 100;
        this.title = title || '';
        this.position = this.titleLength = this.title.length;
    }

    start() {
        cursor.get(position => console.log('123'));
    }

        /*

        this.start = () => {
            if (inline) {
                $this.left = [console]::CursorLeft
                $this.top = [console]::CursorTop

                if ($this.left -gt 0) {
                    Write-Host " " -NoNewline
                    $this.left = $this.left + 1
                }

                Write-Host $this.open -NoNewline -ForegroundColor Green
                Write-Host $this.title -NoNewline -ForegroundColor White
                [console]::SetCursorPosition($this.left + $this.length + 1, $this.top)
                Write-Host $this.close -ForegroundColor Green
            } else {

            }

            return $this
        };

        this.tick = () => {
            $this.Tick(1)
        };

        this.tick = step => {
            $this.Tick($step, $this.title)
        };

        this.tick = (step, title) => {
            $this.Set($this.current + $step, $title)
        };

        this.set = current => {
            $this.Set($current, $this.title)
        };

        this.set = (current, title) => {
            if ($title -ne $this.title) {
                $this.title = $title
                $this.titleLength = [Math]::Max($this.titleLength, $this.title.Length)

                if (inline) {
                    $prev_left = [console]::CursorLeft
                    $prev_top = [console]::CursorTop
                    [console]::SetCursorPosition($this.left + 1, $this.top)
                    Write-Host $this.title -NoNewline -ForegroundColor White

                    ($this.title.Length .. $this.titleLength) | % {
                        Write-Host $this.fill -NoNewline
                    }

                    [console]::SetCursorPosition($prev_left, $prev_top)
                } else {
                    if ($this.title) {
                        Write-Host $this.open -NoNewline -ForegroundColor Green
                        Write-Host $this.title -NoNewline -ForegroundColor White
                        Write-Host $this.close -Fore222222222groundColor Green
                    }
                }
            }

            $this.current = $current
            $this.current = [Math]::Min($this.current, $this.count)
            $prev_position = [Math]::Max($this.position, $this.titleLength)
            $this.position = $this.title.Length + [Math]::Floor(($this.length - $this.title.Length) * $this.current / $this.count)

            if ($this.position -gt $prev_position) {
                if (inline) {
                    $prev_left = [console]::CursorLeft
                    $prev_top = [console]::CursorTop
                    [console]::SetCursorPosition($this.left + $prev_position + 1, $this.top)

                    ($prev_position .. ($this.position - 1)) | % {
                        Write-Host $this.fill -NoNewline -ForegroundColor White
                    }

                    [console]::SetCursorPosition($prev_left, $prev_top)
                } else {
                    Write-Host "$([Math]::Round(100 * $this.current / $this.count))%" -ForegroundColor White
                }
            }
        };
    }
    */
}

module.exports = {
    start: function(count, length, title) {
        return new ProgressBar(count, length, title).start();
    }
}
