
Describe 'Films' {

    It 'Correct Number of Films' {

        $Films = Get-ApiResource 'films/'

        $Films.Count | Should Be 7
    }

}
