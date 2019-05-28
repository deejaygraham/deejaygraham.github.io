
Describe 'Star of A New Hope' {

    It 'Is Luke' {

        $Character = Get-ApiResource 'people/1/'

        $Character.name | Should Be 'Luke Skywalker'
    }

}
